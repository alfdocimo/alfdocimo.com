---
title: How Nextjs helped me develop an MVP
description: Gratitude is a beautiful thing. Especially when it comes from someone who means a lot to you.
date: 2021-03-24
hero: https://images.unsplash.com/photo-1616520836152-09d130550cfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80
heroAlt: Silhouette of mountains
heroCaption: Photo by Claudio Schwarz | @purzlbaum
---

_Originally posted on [dev.to](https://dev.to/alfdocimo/here-s-how-next-js-helped-me-build-and-deploy-an-mvp-in-a-week-2c3)_

I had this idea of having a way to put a smile on somebody's face in only two clicks. It shouldn't take a lot of time to say things like _"great work on this!"_ and, to be honest, we can always use pick-me-ups for motivation to keep us moving forward.

One day, I was looking for open APIs to mess around with and I stumbled upon an API to tell someone off, which was fun. But then it clicked - instead of telling someone off -

> ### What if... we could have _kudos_... as a service?

And thus, [Kuaas](https://kuaas.com/) was born.

The idea got stuck on my head - and it was there for weeks. I decided to create a GitHub repository just to look at it and remind myself to come back to it and actually implement it.

A good friend of mine introduced me to [Next.js](https://nextjs.org/) a week prior to this. I was skeptical at first. I heard good things about it, but I had other ways of doing things. Me, being a javascript enthusiast and a react advocate - decided to give it a try, and boy I can say that this was a turning point for me 🚀

In around 30 minutes I was up and running. And this is because of how amazingly well documented it is.

Okay, let's break down the days:

## Day 1

Ready, set, go! 🏃‍♀️🏃‍♂️

I was very excited to actually start. Even though I work full-time as a SE I still had enough motivation to keep me pushing through and work on this project during the week. The first thing I did was set up a new Notion page with all the things I wanted the app to have. From those - I actually just prioritized enough to have this working as an MVP. After filling the board with tasks and ideas - and my mug with some coffee - I decided it was time to actually work on some visual prototype. Since this was all about experimentation I decided to go with something new for CSS. I ended up picking Tailwind as it had everything I was looking for to set up things quickly and start building my UI.

This is a screenshot from what that initial design looked like:

![Figma Design](https://dev-to-uploads.s3.amazonaws.com/i/4zecfhzrv2k1h007sf1m.jpg)

From this moment on - I was full-on coding 💻

I knew that I didn't just want to have this working as a web app, I also wanted to expose an API. And Nextjs had just the thing for that: [SWR](https://swr.now.sh/).

### API implementation

[Git commit](https://github.com/alfdocimo/kuaas/commit/cdc0f77d4d287a5bd59ec606cc428d8a73d6888d)

So for a __v1__ or __MVP__, I wanted to keep it very simple. You send in a name, and a subject to give kudos about. The service will then map your subject to a random message add in the name, and send it back.

_But hey, here's a little secret. I love gifs_

Then it hit me. Let's integrate this with the GIPHY API! I set up a dev account and got my API key. Tried a couple of methods and then realized that they actually had a __random__ method. I 👏 got 👏 so 👏 happy. This is just what I wanted. See, the idea behind the app is not to include a custom curated message _(which I actually later implemented)_ but the fact that in two clicks you could send a random message along with a Gif to someone. And randomness actually helps on this. It takes out the time you dedicate to select the perfect gif and the perfect message. Okay, back to the API. So now I had this GIPHY integration and I was able to send back a random kudos message based on a subject along with a gif. Yay! but hey - I thought - maybe you _do_ want to customize the message a bit and also select what filter to use to retrieve the gif you want. So I went ahead and implemented a way to send a custom message and also send in a filter for the gif.

### UI implementation

[Git commit](https://github.com/alfdocimo/kuaas/commit/c73ea8bfdf26bb4bd577f5e5080290466c16cea2)

I decided to stay true to my original "design" (I'm sorry to all the designers reading/looking at this. I did my best, I don't know how you guys make things look so good - here's to you 🍷) and just base all the app on this one centered card. This was pretty straightforward - I just looked up the Tailwind docs and started playing around with utility classes until my UI looked someone acceptable.

## UI and API integration

[Git commit](https://github.com/alfdocimo/kuaas/commit/c2906be2fe3be74e1ea7319f46e459a81a123aa3)

Remember about __SWR__? Well, this is the part where I implemented it that. And, no joke - it worked on the first try. This was amazing. I was able to fetch remotely the API I had defined.

And thus - concludes day 1.

## Day 2

Building upon the MVP.

Okay - I already had a UI, my API, and the GIPHY integration, so this day I was pretty chill. I actually just did some minor refactoring and some UI tweaks here and there. I also added a footer in there. [Git commit](https://github.com/alfdocimo/kuaas/commit/56fd64eef25a7ae834cb6075bd020f89dc747be0)

That was actually it for day 2. I decided to get some sleep and tackle other things tomorrow.

## Day 3

This day was pretty interesting! I was very inspired and decided to actually do something most people begin with. Buy a domain! 😅

Turns out [Vercel](https://vercel.com/) allows you to buy a domain through their platform. And then you just assign it to a project and that's it! You now have your project deployed on your domain.

Now, I had some things in mind for today since by the end of the day I was actually gonna be sending this to friends to try it. So we can count this as the "last day"

### Google Analytics Integration

Since I added a domain, I actually wanted to get some analytics in there also. So I integrated GA in there [Git commit](https://github.com/alfdocimo/kuaas/commit/4e72dc993f6578639848830af029bfdfedaf3654)
After playing around with NordVPN I realized it was working properly. Yay!

### Interaction

I felt like something was lacking. Something like:

👉 A go back button/link

👉 A copy url to clipboard button/link

👉 Share on social media buttons/links

The first two were actually pretty straightforward to implement. Its the third one where I was a bit lost and really struck gold when I found [react-share](https://www.npmjs.com/package/react-share)

And this was it. I had a fully functional MVP that I was happy with 😊

The last thing I did was add some basic __docs__ on how to consume __/api/v1__ from an external service.

Finally deployed that through Vercel, and saw my app live. It was pretty amazing seeing people actually go in there and send each other URLs with kudos messages.

## Day 4

Went out for drinks with friends to celebrate! 🍻

_disclaimer: COVID-19 Lockdown is being lifted in Spain. Stay safe, please!_

Thank you so much for taking the time to read. Every bit of feedback helps! 🙏

Also, if you feel like contributing and/or opening issues you're more than welcome!

👉 [Contributing](https://github.com/alfdocimo/kuaas/blob/master/CONTRIBUTING.md)

👉 [Repo](https://github.com/alfdocimo/kuaas)

Stay awesome 💜
