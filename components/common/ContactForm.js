import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import Loading from './Icons/Loading';
import EmailSent from './undraw/EmailSent';

function ContactForm() {
    const [form, handleSubmit] = useForm('contactForm');
    if (form.succeeded) {
        return (
            <div>
                <h1>Thank you, your email has been sent correctly!</h1>
                <EmailSent />
            </div>
        );
    }
    return (
        <form className="w-full my-16" onSubmit={handleSubmit}>
            {(form.submitting && (
                <div className="flex justify-center">
                    <Loading />
                </div>
            )) || (
                <>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block tracking-wide font-bold mb-2"
                                htmlFor="firstName">
                                Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block tracking-wide font-bold mb-2"
                                htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="You last name"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide font-bold mb-2" htmlFor="email">
                                E-mail
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email here"
                            />
                            <ValidationError
                                className="text-salmon"
                                field="email"
                                prefix="A valid email"
                                errors={form.errors}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block tracking-wide font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                id="message"
                                name="message"
                                placeholder="Tell me about you and how you think we can collaborate!"></textarea>
                            <ValidationError
                                className="text-salmon"
                                field="message"
                                prefix="A valid message"
                                errors={form.errors}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={form.submitting}
                            className="bg-sky-blue text-white border border-transparent font-bold py-2 px-4 rounded dark:bg-jade-green dark:text-gray-900 dark:hover:text-jade-green dark:hover:bg-transparent dark:hover:border-jade-green transition duration-500 ease-in-out">
                            <span className="font-bold">Send</span>
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}
export default ContactForm;
