---
title: "GSoC'19: Coding Phase 2 begins"
date: 2019-07-14
tags: [gsoc, coala, experience]
---

So it has been about two weeks since the start of the coding phase 2. I am
really happy to announce that I have passed the evaluation of coding phase 1.
I received very nice feedback from my mentors suggesting me some points to
improve on. I'm constantly trying to improve from the feedback.

### So, what's up for phase 2?
Cool things, if I had to give a short answer. I'm really working on a very cool
project which has some cool ideas, difficult ones but certainly, they are quite
the challenge.
This time I'm implementing two bears in phase 2, namely the
`RequirementsCheckBear` and `RegexLintBear` both of which are quite useful in
project management. So let's discuss the bears and how challenging they were to
code them.

### RequirementsCheckBear
This is one of my favorites bear to code. One of the worst and very very old
problems for `pip` is that it doesn't have any sort of conflict resolving
system. There are works going on, but till now the solution hasn't come out.
`coala-bears` have lot of pip-dependencies, after every change in the versions
the build breaks, it is quite difficult to maintain builds because of the
conflict arising every now and then. This bear, of course, doesn't resolve the
conflicts, since I think pip would have that in the coming years. The job of the
bear is to find such conflicts in project requirements.

The bear collects the requirements from the files provided and compiles all such
requirements without actually installing them. Installation of the requirements
would've been a much better solution overall but since coala already has a lot
of restrictions and the fact that the virtualenv package would break the coala
build, it becomes harder to get it to work. Besides, without installing we're
probably improving the performance of the bear.

So, how did I do it:

The answer was quite simple, pip-compile is one such tool which helped me get
there. As the name suggests, pip-compile can compile the requirements of the
project without actually installing them. Then I simply parsed the output to
check if there's any conflict present in the requirements. As easy as it sounds,
it was much harder to finalize this solution. I spend almost a week figuring out
the best way to implement this bear. I wasn't particularly happy with any of the
approaches but for this bear, I finalized this to be sufficient and efficient at
the same time.

Here is the code for the bear, have a look:


```py
import os

from coalib.bears.GlobalBear import GlobalBear
from coalib.results.Result import Result, RESULT_SEVERITY
from sarge import capture_both


class RequirementsCheckBear(GlobalBear):
    """
    The bear to check and find any conflicting dependencies.
    """
    LANGUAGES = {
        'Python Requirements',
        'Python 2 Requirements',
        'Python 3 Requirements',
    }
    REQUIREMENTS = {PipRequirement('pip-tools', '3.8.0')}
    AUTHORS = {'The coala developers'}
    AUTHORS_EMAILS = {'coala-devel@googlegroups.com'}
    LICENSE = 'AGPL-3.0'

    def run(self, req_files: tuple):
        """
        :param req_files:
            Tuple of requirements files.
        """
        data = ''
        orig_file = ''

        for req_file in req_files:
            if not os.path.isfile(req_file):
                raise ValueError('The file {} doesn\'t exist.'.format(req_file))

            with open(req_file) as req:
                cont = req.read()
                if not orig_file:
                    orig_file = cont
                else:
                    data += cont

        with open(req_files[0], 'a+') as temp_file:
            temp_file.write(data)

        out = capture_both('pip-compile {} -n --no-annotate --no-header '
                           '--no-index --allow-unsafe'.format(req_files[0]))

        if out.stderr.text and not out.stdout.text:
            yield Result(self,
                         message=out.stderr.text.split('\n')[0],
                         severity=RESULT_SEVERITY.MAJOR,
                         )

        with open(req_files[0], 'w+') as temp_file:
            temp_file.write(orig_file)
```

The RegexLintBearis still in works. I have been researching it for a couple of
days. I'm sure of one approach, now I want to make sure its the best one. The
bear needs to be generic which is the main problem. Getting all or most
languages to work for a single code is a bit of a difficult task, but that is
what makes things interesting. :D

So I guess that wraps up this post. I will be writing one more post at the end
of phase 2. I will be completing the RegexLintBear by then and I will post all
the discussions around that in the next post.

Thanks for reading, see you later!
