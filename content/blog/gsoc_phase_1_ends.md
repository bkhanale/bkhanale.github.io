---
title: "GSoC’19: Coding Phase 1 ends"
date: 2019-06-26
tags: [gsoc, coala, experience]
---

So it has been 4 weeks since the start of coding phase 1 and now it's about to
end. I had a really great time coding the bears in this phase. I had to learn a
lot of different things before arriving at the final code. I would discuss some
of the things here, some insights. :)

It all started with the FilemodeBear and later I was able to do the
FilesExistBear each of them dealing with the files setting in coala. Later we
integrated the solution of the FilesExistBear to the coala core to reduce a lot
of redundant code. I already discussed the FileModeBear in the previous post,
this time I would like to discuss the core changes to check the file checking
mechanism and the OutdatedDependencyBear which is new to this post.

### So, the core changes first

The core changes were involved with the addition of two new settings to coala,
namely `require_files_not_empty` and `require_files_for_each_glob`. As long as
they sound, they are just the required settings for the existing files setting
in coala.

Sometimes we want the `files` to be something (i.e. they should not evaluate to
None). In this case, we can use the require_files_not_empty setting to ensure
that the `files` doesn’t evaluate to None. This is quite handy since sometimes
we miss adding some files in the project and this handles those scenarios by
throwing an error and letting us know.

The other setting is useful when we are using a lot of globs in files and we
want each glob to have at least a single file match. Since if there isn't any
file matching, coala would throw an error and would let us know that there are
some files missing in the project.

These changes were made to compensate with the FilesExistBear since the bear had
to do its own files processing and that was quite a job and it was redundant
since, for all bears, coala does the files processing already.

Now, let's move to the hot and new OutdatedDependencyBear.

### OutdatedDependencyBear

Yep, the name is quite long. But, it does a lot of work.

Some projects need to have the latest and greatest packages of all time. These
projects are supposed to work with all of the latest dependencies and they need
to check for the latest versions of the packages continuously. This bear is for
all such projects out there.

The bear is made a generic bear and is planned to support all of the dependency
types. But, as good as it sounds, it is a way harder job. Tbh, not many
dependencies have features like pip. They don’t have an API or a system to check
for the outdated packages, which makes this bear a harder job. But, at the
initial stage, I had planned to add two dependency types covered, pip and npm.
They both have a different algorithm to fetch the outdated packages. The pip
uses the PyPI API whereas for npm we process the output of the
`npm outdated--json` command to get the list of outdated packages in the
project. Although the solution I think isn't perfect, it most certainly works
for most of the tasks.

Here are some code snippets on how I’m achieving this:

```py
def parse_requirements_file(requirements_file):
    """
    Parses the requirements out of the pip requirements.txt file
    :return:
        A list of the names of the packages found in requirements_file.
    """
    data = []
    for line_number, line in enumerate(requirements_file):
        if line.startswith('#'):
            continue
        try:
            res = Requirement.parse(line)
            req = {'package_name': res.project_name,
                   'version': res.specs[0][1],
                   'line_number': line_number,
                   }
            data.append(req)
        except (ValueError, RequirementParseError):
            pass
    return data


def get_latest_version(package):
    """
    Gets the latest version available for the package.
    :return:
        A string with the latest version of the package.
    """
    pypi = xmlrpc_client.ServerProxy(PYPI_URL)
    return pypi.package_releases(package)[0]

```

```py
def npm_outdated_command():
    """
    Executes `npm outdated --json` in the project directory and returns the
    output in the form of json.
    """
    out = run('npm outdated --json', stdout=Capture())
    data = json.loads(out.stdout.text)
    return data

```

The tests are always a big challenge, they sometimes just don’t work. There’s
always the frustration that comes with it. They just keep failing for some
reason :/

Tbh, you know what :P

![meme1](/images/posts/joke1.jpg "I know this is a very old meme, but I guess it's still fun to add this :P")

The tests for both are prepared using unittest.mock. I didn’t really know about
mock tests and I had to read the documentation to get the idea of how I’m gonna
prepare the tests. The more important question in this type of scenario is what
to mock rather than how to. Yes, sometimes the tests might be testing something
which doesn’t make any sense when we see the purpose of the tests. So, I guess
reading the documentation helped me understand a lot of things and I was able to
prepare the tests correctly.

Coding the bear was easy but again, the tests for the bear were also prepared
using mock and I think they were pretty hard to do in the initial stage. Later,
once the tests start to pass, it becomes simple to create more such tests.

Finally, I was able to complete all of the bears in time and completed phase 1
of my GSoC project. I’m really excited about the second phase and will be
starting work soon. Cheers, see you later!
