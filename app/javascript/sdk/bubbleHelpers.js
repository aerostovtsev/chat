import { addClasses, removeClasses, toggleClass } from './DOMHelpers';
import { IFrameHelper } from './IFrameHelper';
import { isExpandedView } from './settingsHelper';

export const bubbleSVG =
  'M23.24.813c-11.438 0-20.709 9.64-20.709 21.54v237.013l59.063-57.464h168.737c11.431 0 20.709-9.647 20.709-21.541V22.353c0-11.9-9.278-21.54-20.709-21.54H23.241ZM76.31 92.3c8.926 0 16.162 7.29 16.162 16.283 0 8.992-7.236 16.282-16.163 16.282-8.926 0-16.163-7.29-16.163-16.282 0-8.993 7.237-16.283 16.163-16.283Zm109 .305c8.926 0 16.163 7.29 16.163 16.283 0 8.992-7.237 16.282-16.163 16.282-8.927 0-16.163-7.29-16.163-16.282 0-8.993 7.236-16.283 16.163-16.283Zm-54.517.407c8.926 0 16.163 7.29 16.163 16.283 0 8.993-7.237 16.282-16.163 16.282-8.927 0-16.163-7.289-16.163-16.282s7.236-16.283 16.163-16.283Z';

export const body = document.getElementsByTagName('body')[0];
export const widgetHolder = document.createElement('div');

export const bubbleHolder = document.createElement('div');
export const chatBubble = document.createElement('button');
export const closeBubble = document.createElement('button');
export const notificationBubble = document.createElement('span');

export const setBubbleText = bubbleText => {
  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.getElementById('woot-widget--expanded__text');
    textNode.innerText = bubbleText;
  }
};

export const createBubbleIcon = ({ className, path, target }) => {
  let bubbleClassName = `${className} woot-elements--${window.$chatwoot.position}`;
  const bubbleIcon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  bubbleIcon.setAttributeNS(null, 'id', 'woot-widget-bubble-icon');
  bubbleIcon.setAttributeNS(null, 'width', '24');
  bubbleIcon.setAttributeNS(null, 'height', '24');
  bubbleIcon.setAttributeNS(null, 'viewBox', '0 0 260 250');
  bubbleIcon.setAttributeNS(null, 'fill', 'none');
  bubbleIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const bubblePath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  bubblePath.setAttributeNS(null, 'd', path);
  bubblePath.setAttributeNS(null, 'fill', '#FFFFFF');

  bubbleIcon.appendChild(bubblePath);
  target.appendChild(bubbleIcon);

  if (isExpandedView(window.$chatwoot.type)) {
    const textNode = document.createElement('div');
    textNode.id = 'woot-widget--expanded__text';
    textNode.innerText = '';
    target.appendChild(textNode);
    bubbleClassName += ' woot-widget--expanded';
  }

  target.className = bubbleClassName;
  target.title = 'Open chat window';
  return target;
};

export const createBubbleHolder = hideMessageBubble => {
  if (hideMessageBubble) {
    addClasses(bubbleHolder, 'woot-hidden');
  }
  addClasses(bubbleHolder, 'woot--bubble-holder');
  body.appendChild(bubbleHolder);
};

export const createNotificationBubble = () => {
  addClasses(notificationBubble, 'woot--notification');
  return notificationBubble;
};

export const onBubbleClick = (props = {}) => {
  const { toggleValue } = props;
  const { isOpen } = window.$chatwoot;
  if (isOpen !== toggleValue) {
    const newIsOpen = toggleValue === undefined ? !isOpen : toggleValue;
    window.$chatwoot.isOpen = newIsOpen;

    toggleClass(chatBubble, 'woot--hide');
    toggleClass(closeBubble, 'woot--hide');
    toggleClass(widgetHolder, 'woot--hide');
    IFrameHelper.events.onBubbleToggle(newIsOpen);

    if (!newIsOpen) {
      chatBubble.focus();
    }
  }
};

export const onClickChatBubble = () => {
  bubbleHolder.addEventListener('click', onBubbleClick);
};

export const addUnreadClass = () => {
  const holderEl = document.querySelector('.woot-widget-holder');
  addClasses(holderEl, 'has-unread-view');
};

export const removeUnreadClass = () => {
  const holderEl = document.querySelector('.woot-widget-holder');
  removeClasses(holderEl, 'has-unread-view');
};
