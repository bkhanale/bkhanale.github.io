---
layout: post
title: 'GSoC’19: Coding Phase 1 begins'
featured: true
tags: [gsoc]
---

So it has been more than two weeks since the start of coding phase 1. I’m a bit
late to write this blog. Anyways, for me, the coding phase 1 was about to get
the three bears, `FileModeBear`, `FilesExistBear` and `OutdatedDependencyBear`.
All of the three bears are generic bears and are helpful in maintaining
projects. I will go through each of those bears to give a good overlook at
those.

### FileModeBear

FileModeBear, as the name suggests, a coala bear to check the `filemode` of the
required files. A filemode represents the permissions allocated to a given file.
In Linux, the permissions can be found out by doing a `ls -l -a` in the project
directory.

The bear comes quite handy as we often forget to onto set +x on scripts. This
bear will check the required permissions set by you every time you run coala
reminding you of missing permissions if any.

Now, lets come to the code and the difficulties I faced during preparing this
bear. One of the obvious difficulty in a bear like this is the difference
between the file modes of Windows and Unix-like systems. They both have
different systems to handle the file permissions but this bear was prepared
to handle both operating systems well. To be honest, I didn’t know how good the
`os` library of Python is. It does a very good job of handling the things in
both operating systems. There are few things it lacks but overall it gets the
job done. 

Preparing the tests was also a very tricky job since again some things can’t be
tested on Windows. Specifically, os.chmod won’t work to set the executable flag
on Windows. It seems like if the file is then the executable flag is
automatically set on Windows.

Here is the bear code for you:

```py
import os
import stat

from coalib.bears.LocalBear import LocalBear
from coalib.results.Result import Result
from coalib.results.RESULT_SEVERITY import RESULT_SEVERITY


class FileModeBear(LocalBear):
    def run(self,
            filename,
            file,
            filemode: str,
            ):
        """
        The bear will check if the file has required permissions provided by
        the user.
        :param filename:
            Name of the file that needs to be checked.
        :param file:
            File that needs to be checked in the form of a list of strings.
        :param filemode:
            Filemode to check, e.g. `rw`, `rwx`, etc.
        """
        st = os.stat(filename)
        permissions = {'r': stat.S_IRUSR,
                       'w': stat.S_IWUSR,
                       'x': stat.S_IXUSR,
                       }

        for char in filemode:
            if char not in permissions:
                raise ValueError('Unable to recognize character `{}` in '
                                 'filemode `{}`.'.format(char, filemode))

        mode = st.st_mode
        for char in filemode:
            if not mode & permissions[char]:
                message = ('The file permissions are not adequate. The '
                           'permissions are set to {}'.format(stat.filemode(
                                                              mode)))
                return [Result.from_values(origin=self,
                                           message=message,
                                           severity=RESULT_SEVERITY.INFO,
                                           file=filename)]
 
```

Want to see the tests? Here is a small part of the tests file:

```py
import os
import platform
import stat

from queue import Queue

from bears.general.FileModeBear import FileModeBear
from coalib.testing.LocalBearTestHelper import LocalBearTestHelper
from coalib.results.Result import RESULT_SEVERITY, Result
from coalib.settings.Section import Section
from coalib.settings.Setting import Setting


def get_testfile_path(file):
    return os.path.join(os.path.dirname(__file__),
                        'filemode_test_files', file)


FILE_PATH = get_testfile_path('test_file.txt')


class FileModeBearTest(LocalBearTestHelper):

    def setUp(self):
        self.section = Section('')
        self.uut = FileModeBear(self.section, Queue())

    def test_r_to_r_permissions(self):
        os.chmod(FILE_PATH, stat.S_IRUSR)
        self.section.append(Setting('filemode', 'r'))
        self.check_results(
            self.uut,
            [],
            [],
            filename=FILE_PATH,
            )

    def test_w_to_w_permissions(self):
        os.chmod(FILE_PATH, stat.S_IWUSR)
        self.section.append(Setting('filemode', 'w'))
        self.check_results(
            self.uut,
            [],
            [],
            filename=FILE_PATH,
            )

    def test_x_to_x_permissions(self):
        os.chmod(FILE_PATH, stat.S_IXUSR)
        if platform.system() != 'Windows':
            self.section.append(Setting('filemode', 'x'))
            self.check_results(
                self.uut,
                [],
                [],
                filename=FILE_PATH,
                )

    def test_rw_to_rw_permissions(self):
        os.chmod(FILE_PATH, stat.S_IRUSR | stat.S_IWUSR)
        self.section.append(Setting('filemode', 'rw'))
        self.check_results(
            self.uut,
            [],
            [],
            filename=FILE_PATH,
            )

    def test_wx_to_wx_permissions(self):
        os.chmod(FILE_PATH, stat.S_IWUSR | stat.S_IXUSR)
        if platform.system() != 'Windows':
            self.section.append(Setting('filemode', 'wx'))
            self.check_results(
                self.uut,
                [],
                [],
                filename=FILE_PATH,
                )

```

### FilesExistBear

The bear is one of the generic bears which checks for every time we run coala.
The setting is provided to the bear in the form of a tuple.

The bear was pretty handy as we often forget to keep some default files like
LICENSEfile, README.md file, etc. The bear will let you know if you miss any of
these files on running coala.

The bear had multiple ways to implement. One of the ways, as I suggested above,
was to create a new bear to do this process. But since coala already has an
attribute which checks for files, we don’t need an additional redundant
algorithm to do that again.

This was suggested by jayvdb, and I agreed to his suggestion. Although the
initial approach was to prepare a bear, the new and probably improved approached
was to use the coala `files` attribute to do this. So, in order to do this we need
to introduce two new settings to coala, namely `require_files_not_empty` and
`require_files_for_each_glob` each taking a boolean value to select what happens
if entire files evaluate to zero or any of the globs has missing files.

Implementation coming up next! :)
