var exec = require('child_process').exec;

exports.run = function run(opts, callback) {
	opts = opts || {};

	var cmd = 'git log --numstat --no-merges --pretty="<COMMIT>%aN<FIELD>%aE<FIELD>%s<FIELD>"';

	if (opts.previous) {
		cmd += ' ' + opts.previous + '..';

		if (opts.current) {
			cmd += opts.current;
		}
	}

	exec(cmd, {
		cwd: opts.repository,
		maxBuffer: 25000 * 1024

	}, function(err, stdout) {

		if (err) {
			return callback(err);
		}

		var commits = trim(stdout).split('<COMMIT>').slice(1).map(function(line) {
			var commit = split(line, '<FIELD>', ['name', 'email', 'subject', 'numstat']);

			var numstat = commit.numstat;

			commit.numstat = {
				added: 0,
				deleted: 0
			}

			if (numstat) {

				numstat.split('\n').forEach(function(file) {
					var filestat = file.split('\t');

					commit.numstat.added += (filestat[0] === '-') ? 1 : parseInt(filestat[0], 10);
					commit.numstat.deleted += (filestat[1] === '-') ? 1 : parseInt(filestat[1], 10);
				});
			}

			return commit;
		});

		var contributors = {};
		var names = {};

		commits.forEach(function(commit) {

			if (opts.names && !names[commit.name]) {
				names[commit.name] = commit.email;
			}

			var email = (opts.names && !contributors[commit.email] && names[commit.name]) ? names[commit.name] : commit.email;

			if (!contributors[email]) {
				contributors[email] = [];
			}

			contributors[email].push(commit);
		});

		var results = {
			contributors: [],
			totals: {
				commits: commits.length,
				added: 0,
				deleted: 0,
				sum: 0,
				diff: 0
			}
		};

		for (var email in contributors) {

			var result = {
				name: contributors[email][0].name,
				email: contributors[email][0].email,
				subjects: [],
				commits: contributors[email].length,
				added: 0,
				deleted: 0,
				sum: 0,
				diff: 0
			};

			contributors[email].forEach(function(commit) {
				result.added += commit.numstat.added;
				result.deleted += commit.numstat.deleted;

				result.subjects.push(commit.subject);
			});

			result.sum = result.added + result.deleted;
			result.diff = Math.abs(result.added - result.deleted);

			results.totals.added += result.added;
			results.totals.deleted += result.deleted;

			results.contributors.push(result);
		}

		results.totals.sum = results.totals.added + results.totals.deleted;
		results.totals.diff = Math.abs(results.totals.added - results.totals.deleted);

		results.contributors.sort(function(a, b) {

			if (a[opts.sort] === b[opts.sort]) {
				return 0;
			} else {
				return (a[opts.sort] < b[opts.sort]) ? 1 : -1;
			}

		});

		callback(null, results);
	});
};

function trim(str) {
	return str.replace(/(^\s+|\s+$)/, '');
}

function split(str, sep, keys) {
	var array = trim(str).split(sep);
	var object = {};

	keys.forEach(function(key, index) {
		object[key] = trim(array[index]);
	});

	return object;
}