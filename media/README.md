# /media — Instagram staging

Instagram's publishing API will not accept a file upload. It only takes a **public
URL**, which Meta's servers then fetch. This folder is that URL.

A post goes out like this:

1. the finished image or video is copied in here and pushed
2. GitHub Pages serves it at `https://medmatchglobal.info/media/<file>`
3. Instagram fetches it and builds the post
4. the file is removed again

It is `Disallow`ed in `robots.txt`, so nothing here should ever reach Google.

## Read this before adding interview footage

**Git history is permanent.** Deleting a file from this folder removes it from the
website, but the file stays in the repository's history, and this repository is
public. Deleting is not the same as erasing.

So: if a participant withdraws consent, do not just delete the file — say so, and
the history has to be rewritten properly (`git filter-repo`) and force-pushed.
That works, but it is a real job, not a one-liner.

The safe habit is to keep clips here only as long as it takes Instagram to fetch
them, which is usually under a minute. `reels/publish-ig.mjs` cleans up on its own.

Nothing in this folder is linked from any page on the site.
