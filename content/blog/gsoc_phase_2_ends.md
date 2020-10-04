---
title: "GSoC'19: Coding Phase 2 ends"
date: 2019-07-22
tags: [gsoc, coala, experience]
---

So here I am writing this blog after an exciting phase of Google Summer of Code 2019. This was the second phase of the program and it has been quite exciting, to be honest. There was a lot of research, a lot of thinking and the work to get the bears done. Let’s discuss some of the things I really enjoyed during this phase.

## RequirementsCheckBear

Probably the most exciting bear I’ve ever written. This bear does some magic. Yes, its true, magic. Let me explain:

We always have those requirements in the requirements.txt which we have to install every time we want some software to work. Well, those requirements aren’t always good. They just break, a lot of times. Yeah, I know we pin them to a specific version but for development of projects which need the most updated versions of every package, they are kept in compatibility mode. This means that they can still update, it just makes sure that they are compatible with the version we tested them on. And as the requirement progresses, they keep changing their dependencies and for as good as pip is, they create conflicts!

The conflicts are too common, and pip still doesn’t have its most required feature, the conflict resolution mechanism. It is still in development, but I think it's still gonna take some time to be good enough.

About the bear now:

The smart RequirementsCheckBear basically uses the functionality of pip-compile which comes as a part of pip-tools . That and some processing from our side makes the bear complete. The aim of the bear was to check for such conflicts, and if there are some conflicts then let the user know about it. The pip-compile is a wonderful tool, which basically mimics the installation of pip requirements. It just does it without actually doing it. So, without actually installing the requirements it generates the dependency tree. How cool is that! I tried going through the pip-tools code for the compilation part, but let's leave that for now.

If you’re curious like me, here is the code for the RequirementsCheckBear:

{{< gist bkhanale c8db25dfe1a0198ffac4e5c5d1f4a717 >}}

Yes, the tests are also there but I don’t think you’d be interested in that. Now, this bear is just awesome because it actually helps you to control the conflicts caused due to the requirements. This bear was I think a much difficult task to do, considering the complexity of the raw solution. It’s much harder to actually complete the solution than to just think about it.

Enough, let's move to the next bear quickly:

## RegexLintBear

The regex, yeah they are quite powerful. And its equally important to keep them in a check. Sometimes, we do stupid things in the regex, we keep something we might not actually need or something which is different from what we think it is. To help with the cause, we now have a nice RegexLintBear.

This bear internally uses the regexlint tool but makes it complete and more powerful. The regexlint requires regex or strings directly as the input. But, as we know its terrible to manually pass all those strings to it. We want it to automatically get all the regex from a file and run the regexlint on each one of them and return the result. Well, the RegexLintBear exactly does this. It uses AnnotationBear which is another cool coala bear btw, to get all the strings from the files. Later we detect all the regexes out of it and run regexlint on them. Giving away the nice coala results.

Well actually, regexlint does some really nice stuff, I’m not going deep into it. But because of the bear, the tool gets much more interesting and useful

Here is some code for the nerds:

{{< gist bkhanale 204a11b3dd2cbbb581c3fddbe66ae75f >}}

So with that, I think its time to end this blog. I’m quite happy to finish all the assigned tasks this phase. And I’m really excited about the next phase now, a lot of more interesting things to come up next month.

Also, my college is gonna start soon, so I think its gonna be quite hectic. But, nevertheless, it's going to be a lot more interesting.
