
[_metadata_:author]:- "Ofir Yaron"
[_metadata_:title]:- "Tampermonkey - common function"
[_metadata_:tags]:- "markdown,blog"
[_metadata_:date]:- "1/9/2022"

# Tampermonkey - Automate your boring repetitive online actions
<p>
Tampermonkey is a very popular userscript manager, it makes it very easy to create scripted automations, manage your userscripts and it's available for Chrome, Microsoft Edge, Safari, Opera Next, and Firefox.
</p>
  
<p>
personally I use it mostly to automate my repetitive online actions, but I did use it as a developer to script a webpage funnel and have it run with the click of a button instead of do going through the website funnel manually every time just to check a mini feature at the end of the funnel.
</p>
  
<p>
To install [Tampermonkey](https://www.tampermonkey.net/)
</p>
  
<p>
since Tampermonkey script use Vanila javascript, over time I've found my self recreating these basic utility function that can come handy:
</p>

<code language="javascript">
const mouseEvent = new Event('dblclick', {
  'view': window,
  'bubbles': true,
  'cancelable': true
});
</code>
  
Changing an input value that also handles React states:
<code language='javascript'>
  function dispatchValueChange(input, newValue){
    let lastValue = input.value;
    input.value = newValue;
    let event = new Event('input', { bubbles: true });
    event.simulated = true;
    let tracker = input._valueTracker;
    if (tracker) {
        tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
  }
  function dispatchValueChangeById(elementId, newValue){
    const element = document.getElementById(elementId);
    dispatchValueChange(element, newValue);
  }
</code>
<br>
An additional method (based on **dispatchValueChange**) to change the value by a css selector
<code language='javascript'>
function dispatchValueChangeBySelector(elementSelector, newValue){
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length) {
      dispatchValueChange(elements[0], newValue);
  }
}
</code>
<br>

Wait functions to have a proper wait when changing rendered page:
<code language='javascript'>
  function waitForElementById(elementId) {
    return new Promise((resolve) => {
      const checkExist = setInterval(function () {
        if (document.getElementById(elementId)) {
            clearInterval(checkExist);
            resolve();
        }
      }, 300);
    });
  }
  function waitForElementBySelector(elementSelector) {
    return new Promise((resolve) => {
      const checkExist = setInterval(function () {
        if (document.querySelectorAll(elementSelector).length) {
          clearInterval(checkExist);
          resolve();
        }
    }, 300);
    });
  }
</code>

<br>
Click an element by a css selector
<code language='javascript'>
function clickBySelector(elementSelector) {
  const elements = document.querySelectorAll(elementSelector);
  if (elements.length) {
    elements[0].click();
  }
}
</code>
