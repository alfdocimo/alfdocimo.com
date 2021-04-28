---
title: Reactivity and proxies
description: Ever think about how Vue achieves reactivity? Let's look into it.
date: 2021-01-25
hero: https://images.unsplash.com/photo-1611955727536-b3799f3c4ab9?auto=format&fit=crop&w=600&q=80
heroAlt: 2 person jumping on white background
heroCaption: Photo by Anderson Rian
---

I recently came across an amazing lecture by Tejas Kumar on [Deconstructing React](https://www.youtube.com/watch?v=f2mMOiCSj5c&ab_channel=CodingTech). It left me wondering what we can achieve if we take the time to sit down and understand how things work under the hood. For this to work, you might have to take things **apart** and put them back together. I have been, for most of my time in the industry at least, that type of dev who likes to just plug something in, and expect it to work without further understanding. That was until I started asking myself all sorts of things like:

Ok, if that's how React works, then _how does Vue work? Is it all magic? Why is the sky blue? What's the meaning of life?_

<iframe width="608" height="315" src="https://www.youtube.com/embed/QgGnUfxfFSs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<sub>You can also check out this video on my YouTube channel for more info!</sub>

I'm not a Vue developer. I do not prefer any framework or library over another. I believe that there's no one-size-fits-all solution for all that you can do in Front End. One thing that I do love, and you might have guessed it from the blog's description, is **javascript**, and digging into its capabilities, and understanding it to its core.

Among some of these core concepts, lie some niche built-in utilities that are rarely used. Yes, I'm talking about **proxies**.

[Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) are amazing. And throughout this post, I'll try to explain how Vue profits from Proxies to achieve reactivity.

Let's look at most basic example there is about Vue:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My first Vue app</title>
        <script src="https://unpkg.com/vue"></script>
    </head>
    <body>
        <div id="app">{{ message }}</div>

        <script>
            const data = {
                message: 'Hello Vue!'
            };

            const app = new Vue({
                el: '#app',
                data
            });
        </script>
    </body>
</html>
```

This should just render a **Hello Vue!** to the browser. There's nothing new here. However, if I imperatively mutate a property from the **data** object, this will immediately trigger a rerender.

```js
//...
setTimeout(() => {
    data.message = 'Hi!';
}, 3000);
//...
```

You should immediately see how it updates.

So, to me, this seems odd. Right? How can you tell just by mutating something that Vue needs to trigger a rerender? I mean, you'd need something to observe the data and then call a rerender function right?

In my head, if we remove Vue from the equation, we'd need to imperatively trigger a rerender each time we change the state.

```js
const data = {
    message: 'Hello world!'
};

function render() {
    const app = document.querySelector('#app');
    app.innerHTML = data.message;
}

render();

setTimeout(() => {
    data.message = 'Hi!';
    render();
}, 3000);
```

Which is not exactly prettier, is it? We can do better. Observers and callbacks might be more suitable for this!

We can achieve reactivity through a very bare-bones implementation of Observables. At first, I thought about actually having an Observer and an Observable class, but for this particular example, we could achieve the same results with just an Observer class that subscribes to callbacks and triggers them whenever the state changes.

```js
class Observable {
    constructor(state) {
        this.state = state;
        this.callbacks = [];
    }

    subscribe(callback) {
        this.callbacks.push(callback);
    }

    notify() {
        this.callbacks.forEach((callback) => {
            callback();
        });
    }

    setState(newState) {
        this.state = newState;
        this.notify();
    }

    getState() {
        return this.state;
    }
}
```

So now, we can remove that imperative **render** call we made in the setTimeout and let our callbacks take care of that for us.

```js
const data = new Observable({
    message: 'Hello world!'
});

function render() {
    const app = document.querySelector('#app');
    app.innerHTML = data.getState().message;
}

render();

data.subscribe(render);

setTimeout(() => {
    data.setState({ message: 'Hi!' });
}, 3000);
```

Now, that's one way to achieve reactivity, but we would need to call **getState** and **setState** to do this, and as we have seen from Vue's implementation, you can just mutate the data object and Vue will take care of this for you.

So let's break this down...

We need a way to interrupt the flow so that _before_ and _after_ we set a new value to the data object, we can trigger a rerender or notify our observable to run all the callbacks that are subscribed to it.

**Proxies to the rescue! 🐱‍🏍**

We can conceptualize a proxy as the authority to represent someone or something else. The proxy serves as a guardian of the object (also called a “real subject”) and tries to have the real subject do as little work as possible.
Through this Proxy object, we can intercept any access to the property of an object and manage it according to what we define in the handlers.

> We can picture Proxies as middlewares for JavaScript objects.

There are three main components to the Proxy object:

👉 Handlers: is as simple as a placeholder object which contains all the traps defined to intercept and handle all the calls to another object’s properties

👉 Traps: these are methods that provide or deny access to a property. Traps allow us to intercept interactions with the targeted object in different ways if those interactions happen through a Proxy.

👉 Target: is an object which the Proxy virtualizes (a.k.a the "real subject"). It can be any sort of object or a function or even another proxy, which will be wrapped with Proxy.

Lets look at an example implementation:

```js
const target = {
    a: 1,
    b: 2,
    c: 3
};

const handler = {
    get: (target, name) => {
        return name in target ? target[name] : 42;
    },
    set: () => {
        console.log('I am being triggered when you set a new value');
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.a); // 1
console.log(proxy.b); // 2
console.log(proxy.c); // 3
proxy.c = 'Something else'; // I am being triggered when you set a new value
console.log(proxy.meaningOfLife); // 42
```

In the example above we're proxying the target object and defining a custom behavior in our handlers so that if the property we're looking for doesn't exist, it will return 42. Also, whenever we change the value, it runs a side effect which will run a console log. A simple example, but a powerful one. Notice that now we can add custom behavior whenever we interact with the proxy object.

> We can profit from proxies to achieve reactivity

Let's do a little refactoring of our Observable class to an "App" class. Inside of it, we'll instantiate a new Proxy based on the _data_ object we receive. Inside the proxy handlers, we can call the notify method, to make sure all of the callbacks are called as well whenever we set a new value to our data object (the proxy data object, not the original one).

```js
class App {
    constructor({ data }) {
        this.data = this.initProxy(data);
        this.callbacks = [];
    }

    //...

    initProxy(data) {
        return new Proxy(data, {
            set: (target, prop, value, receiver) => {
                target[prop] = value;

                this.notify();
                return true;
            },
            get: (target, name, receiver) => {
                return target[name];
            }
        });
    }

    //...
}
```

With that, we have achieved reactivity through proxies and observables. If we were to modify (mutate) our app data anywhere, it will automatically trigger all the callbacks for us!

```js
const myApp = new App({
    data: { message: 'Hello World!' }
});

function render() {
    const app = document.querySelector('#app');
    app.innerHTML = myApp.data.message;
}

render();

myApp.subscribe(render);

setTimeout(() => {
    myApp.data.message = 'Hi!';
}, 3000);
```

We can even define event listeners in another node, say an input, and when defining the callback we can directly set the new value coming from the event to the proxy object, and it will take care of the rerendering for us. For instance:

```js
// ...
function handleInput(e) {
    myApp.data.message = e.target.value;
}

const input = document.querySelector('#app input');
input.addEventListener('input', handleInput);
// ...
```

Here's a basic example of all that we've covered so far:

<iframe src="https://codesandbox.io/embed/reactivity-and-proxies-1ncjp?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="reactivity-and-proxies"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

This is _not_ meant to be taken as "the one way" of achieving _reactivity_. It's more of a mental map of how I imagine Vue or any other libraries/frameworks to profit from both Observers and Proxies to achieve reactivity.

Thank you for reading, stay awesome 💚
