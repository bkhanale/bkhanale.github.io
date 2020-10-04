---
title: "GSoC'19: Coding Phase 3 begins"
date: 2019-08-12
tags: [gsoc, coala, experience]
---

So after the exciting coding phase 2, we move on for the next phase. This is one of the most interesting phases since I expect a lot of reviews, merges, etc in it. Also, we will be preparing the final report which will be reviewed by the mentors and Google as well, so we need to do completely finish off all of the assigned tasks. Let’s have a quite look at my work until now.

## Ignore the doc comments in IndentationBear

The first issue was to ignore the docstrings in the IndentationBear. The bear is quite interesting since just by using the coala language definitions it can report the proper indentation for the code. I love such generic bears.

My task was to ignore all the docstrings or doc comments in the file while running IndentationBear. Why do you ask? Because we just don’t require the doc comments to be properly indented. We usually keep a lot of stuff like examples, code, etc and sometimes we just won’t need the IndentationBear to report issues on them. This issue solves that problem.

The coding part was quite straightforward, but I just took a lot of time to get to the correct approach. I was trying to do something we didn’t need in the first place. But, that helped me understand the bear much more, the bear is quite plain and simple in implementation yet it so useful ;)

## Improving MarkdownBear

I’ve used this bear is my projects, and honestly, every time I run coala, MarkdownBear does complain about the style but doesn’t tell me what exactly the issue is. This is because it doesn’t have the style guide it needs. remark which is responsible for this bear have different style guides available to install via npm. We just need to integrate one such style guide with this bear.

I’ve been up to this since two or maybe three days now, and I’m facing a lot of difficulties while doing so. The issues reported by the style guide and the patches suggested by the cli are not in sync. They just work differently. We can someway change few things to get them in sync but they will break for different files too often. Hence, a polished new approach is in works. I’ll update this issue in the next post with the new approach.

So, that covers up my phase 3 beginning. There’s about a week more, and I’m confident that I’ll complete the project in the next coming days.

Thanks for reading, see you soon. :)
