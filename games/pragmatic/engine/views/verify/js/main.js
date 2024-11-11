const URL_API = window.URL_API; // for relative path use pattern "dir1/dir2...."
const URL_404 = window.URL_404 || "http://404.pragmaticplay.com/";
const STATUS_EXPIRED = "EXPIRED";
const STATUS_SUCCESS = "SUCCESS";
const STATUS_MAINTENANCE = "MAINTENANCE";
const STATUS_INVALID = "INVALID";
const STATUS_UNKNOWN = "UNKNOWN";
const API_REQUEST_RETRY_COUNT = 3;
const DEFAULT_LANG = "ko";

const REPORT_CONTACTS = {
    email: {
        regex: /(report@pragmaticplay.com)/,
        link: "kssk@chutiya.xyz"
    },
    telegram: {
        regex: /(@ppverify \(.*\))/,
        link: "https://t.me/ppverify"
    }
};

// this is used for local testing
const localResponse = {
    status: "SUCCESS",
    balance: 100500.15,
    currency: "USD",
    currencySymbol: "$",
    rounds: [
        {
            id: 1236789,
            name: "3 Genie Wishes",
            symbol: "vs50aladdin",
            date: 1649795670010,
            betAmount: 0.01
        }
    ],
    settings: {
        displayRoundsEnabled: true
    }
};

const getEl = (id, parent = document) => {
    return parent.getElementById(id) || parent.querySelector(id);
};

async function fetchRetry(url, tryCounter = API_REQUEST_RETRY_COUNT) {
    try {
        const req = await fetch(url);
        return await req.json();
    } catch (err) {
        if (tryCounter === 1) throw err;
        return fetchRetry(url, tryCounter - 1);
    }
}

async function checkSession(mgckey, lang) {
    const url = new URL(URL_API, window.location.origin);
    url.search = new URLSearchParams({
        mgckey,
        lang
    });
    try {
        return await fetchRetry(url);
        // return localResponse
    } catch (err) {
        //window.location.href = URL_404;
        console.log(err);
    }
}

async function loadTranslations(lang = DEFAULT_LANG) {
    try {
        const translations = await fetchRetry(`/verify/i18n/${lang}.json`, 1);
        return {
            lang,
            translations
        };
    } catch (e) {
        return await loadTranslations(DEFAULT_LANG);
    }
}

function updateElText(id, text, parent) {
    const el = getEl(id, parent);
    if (el) el.innerHTML = text;
}

function getParamsFromUrl() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((val, key) => (params[key] = val));

    return params;
}

function applyTranslationsByArray(translations, elIds) {
    elIds.forEach(elId => {
        updateElText(elId, translations[elId]);
    });
}

function applyAllTranslationsFromObj(translations) {
    applyTranslationsByArray(translations, Object.keys(translations));
}

function decorateCurrency(number, lang, currencySymbol, options) {
    console.log(number, lang, currencySymbol, options);
    const sign = currencySymbol === "&euro;" ? "   " : currencySymbol; // hack
    const defaultOptions = sign
        ? {
              style: "currency",
              currency: "USD"
          }
        : {
              minimumFractionDigits: 2
          };
    let parts;

    try {
        parts = Intl.NumberFormat(lang, { ...defaultOptions, ...options }).formatToParts(number);
    } catch {
        parts = Intl.NumberFormat(DEFAULT_LANG, { ...defaultOptions, ...options }).formatToParts(number);
    }

    return parts.map(({ type, value }) => (type !== "currency" ? value : `${sign}${sign.length > 1 ? " " : ""}`)).join("");
}

function updateFontSizeToWidth(el) {
    const maxWidth = el.scrollWidth;
    const range = document.createRange();
    range.selectNode(el.childNodes[0]);
    const currentTextWidth = range.getBoundingClientRect().width;
    const currentFontSize = parseFloat(window.getComputedStyle(el).fontSize);
    const newFontSize = (maxWidth / currentTextWidth) * currentFontSize;
    el.style.setProperty("font-size", `clamp(15px, ${newFontSize - 2}px, 58px)`);
}

(async function() {
    const urlParams = getParamsFromUrl();

    const { lang, translations } = await loadTranslations(urlParams.lang);
    const { balance, currencySymbol, status, rounds = [] } = await checkSession(urlParams.mgckey, lang);

    if (status !== STATUS_SUCCESS) {
        window.location.href = URL_404;
        return;
    }

    applyAllTranslationsFromObj(translations);

    updateElText("step1-text", translations["step1-text"].replace("domain", `<b>${url}</b>`));
    updateElText("attention-step1-text", translations["attention-step1-text"].replace("domain", `<b>${url}</b>`));
    updateElText("email", translations["email"].replace(REPORT_CONTACTS.email.regex, `<a href="mailto:${REPORT_CONTACTS.email.link}">$1</a>`));
    {
        const text = lang !== "ko" ? "" : translations["telegram"].replace(REPORT_CONTACTS.telegram.regex, `<a href="${REPORT_CONTACTS.telegram.link}" target="_blank">$1</a>`);
        updateElText("telegram", text);
    }

    const round = rounds[0];
    if (round) {
        const record = getEl("roundDetails").content.cloneNode(true);
        updateElText(".round", round.id, record);
        updateElText(".game", round.name, record);
        updateElText(".bet", decorateCurrency(round.betAmount, lang, currencySymbol), record);
        updateElText(".time", new Date(round.date).toLocaleString(lang), record);
        getEl("rounds-table").appendChild(record);
        getEl("rounds-table").classList.remove("hidden");
    } else {
        getEl("rounds-absent").classList.remove("hidden");
        getEl('attention-step2').classList.remove('hidden');
    }

    document.getElementsByClassName("url-bar")[0].src = `/verify/img/${url}.png`;
    document.body.classList.remove("hidden");
    updateFontSizeToWidth(getEl("verify-title"));
})();
