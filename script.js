let accounts = [];

async function loadJSON (name) {
  const fetched = await fetch(`${name}.json`);
  return fetched.json();
}

const hasProsecuted = twitter => {
  return accounts.includes(twitter.replace('@'));
}

const focusInput = () => document.querySelector('#twitter').focus();

const onSubmit = event => {
  if (event.keyCode !== 13) return;

  const twitter = document.querySelector('#twitter');
  const result = document.querySelector('.result');
  const account = document.querySelector('.account');
  const back = document.querySelector('.back');

  account.innerText = '@' + twitter.value.replace('@', '');

  if (hasProsecuted(twitter.value.replace('@', ''))) {
    document.body.classList.add('prosecuted');
    document.querySelector('.audio-yes').play();
    result.innerText = 'SIM! 👍';
  } else {
    document.body.classList.add('not-prosecuted');
    document.querySelector('.audio-no').play();
    result.innerText = 'NÃO! 👎';
  }

  twitter.classList.add('hidden');
  result.classList.remove('hidden');
  account.classList.remove('invisible');
  back.classList.remove('hidden');
}

const reset = () => {
  const twitter = document.querySelector('#twitter');
  const result = document.querySelector('.result');
  const account = document.querySelector('.account');
  const back = document.querySelector('.back');

  twitter.value = "";
  twitter.classList.remove('hidden');
  result.classList.add('hidden');
  account.classList.add('invisible');
  back.classList.add('hidden');

  document.body.classList.remove('prosecuted');
  document.body.classList.remove('not-prosecuted');
}

const onLoad = async event => {
  document.body.addEventListener("click", focusInput);
  document.querySelector('#twitter').addEventListener("keypress", onSubmit);
  document.querySelector('.back').addEventListener("click", reset);
  accounts = await loadJSON('assets/accounts');
}

document.addEventListener("DOMContentLoaded", onLoad);
