---
title: "GSoC'19: Coding Phase 3 ends"
date: 2019-08-20
tags: [gsoc, coala, experience]
---

I’m excited to let you know that now, the final phase of GSoC’19 has come to an end. This is the last week for the students to finish off their projects and submit their final evaluations.

First of all, I would like to thank all of my mentors at coala, [Sangam Kumar](https://github.com/sangamcse), [Abhinav Kaushlya](https://github.com/abhishalya) and [Kriti Rohilla](https://github.com/kriti21) who kept helping me to finish off this project. Also thanks to the awesome coala community which helped me in my doubts and provided me with the opportunity to work on this project. Finally thanks to Google for an awesome summer!

For the last time, let's go through the work done in this second half of phase 3.

## MarkdownBear

This was one of the most consuming tasks. The issue was the MarkdownBear could only emit fixes and couldn’t display the issues for which the fixes were supposed to be. This is much like the PEP8Bear which was also a part of this phase. The initial approach was to add new presets and plugins to the bear (which essentially ran on remark-lint) so that they could give out their ‘warnings’ which we could parse and then yield them with the fixes being produced. But guess what? They were not in sync. The fixes didn’t match the issues being reported. After digging it a bit, and not setting any settings for the bear they worked better but still I could see for some issues there were no fixes and vice-versa.

This entire process took me a few days and I couldn’t come up with the best possible algorithm to solve this. One possible fix is to construct a new bear with none selected settings and ignore all such issues/fixes which doesn’t have their corresponding fix/issue. But, this was very redundant and didn’t give any control of the bear to the user. Also, this bear could just break too many times, and breaking bear would be the last thing coala maintainers need :P

## Updates to package_manager

The initial changes to the package_manager were made when I was constructing OutdatedDependencyBear. Since then, the changes needed updates and I was able to do them in this phase. I introduced a new function to the PipRequirement and NpmRequirement classes of coala’s package manager get_latest_version which was responsible to get the latest version of the package from pip and npm registry. Initially, there were two different approaches to fetch the outdated packages, but since we needed something which would provide a consistent API and should be similar to the package_manager’s code this was the best approach available.

Unfortunately, there were few issues in doing this. One of the obvious flaws was we couldn’t parse the requirements file. For pip, it would be requirements.txt file and for npm, it would be package.json file. The parsing was troublesome since they had the version specifiers and we couldn’t simply parse them manually. We needed something to do the work for us and return a good stable result with the expected versions from the requirements. For pip, I used pip-compile which comes in handy in such situations. For npm tough, there was an inbuilt tool to handle this, but due to the differences being created in the pip and npm approach, I finally decided to drop npm from the OutdatedDependencyBear.

Finally, I did some digging for autopep8 but it since autopep8 didn’t want issues to be reported along with their fixes we had to rely on our initial approach for the fix. The initial approach involved invoking pycodestyle in PEP8Bear so that we could fetch the issues and then pass those issues to autopep8 to get a fix for.

So, that’s it. I’ve completed all of my work and the report is also being prepared [here](https://bkhanale.github.io/GSoCReport). I will submit it once my mentors have approved with it. Hope you liked this series with my GSoC experience and see you soon with some exciting new posts 😃
