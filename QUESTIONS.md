
## Questions & Answers

1. What would you add to your solution if you had more time?

Could have made app more secure by adding:
- Code obfustaion
- Certificate pinning
- Saving host name in secure place like keychain
- UI improvements 


2. What would you have done differently if you knew this page was going to get thousands of views
per second vs per week?

3. What was the most useful feature that was added to the latest version of your chosen language?
Please include a snippet of code that shows how you've used it.
Hooks, have not used them here because I am still learning them.

4. How would you track down a performance issue in production? Have you ever had to do this?
Performance issue are usually occur on low end devices. To track down, I would try to gather more information about the same issue on different devices so as to understand the potential fix.

5. Can you describe common security concerns to consider for a frontend developer?
- Code obfustaion
- Certificate pinning, SSL pinning
- Try not to save any PII data
- Saving absolute neccessary info in secure place like keychain
- database encryption
- sending encrypted values to server to avoid man in the middle attack.

6. How would you improve the API that you just used?
The calculations which I am doing on the UI should ideally come from the api to reduce device overhead. UI should be used only to display information recieved from the api. It is not a good idea to perform heavy calculations inside the app. 