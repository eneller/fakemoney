# FakeMoney
**A PayPal-like payment processor for virtual money, intended to be used for [simulation games](https://de.wikipedia.org/wiki/Schule_als_Staat).**

Send and receive money from your account and businesses you own using simple URLs and QR codes.
Install as a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
from your browser (Firefox/Chrome/Safari) with just 3 taps and bypass tedious app store processes.


<img src="docs/img/screenshot-login.png" width="32%" alt="Login view">&nbsp;
<img src="docs/img/screenshot-send.png" width="32%" alt="Send view">&nbsp;
<img src="docs/img/screenshot-receive.png" width="32%" alt="Receive view">&nbsp;

## Deployment
Is simplified using Docker and by making a few assumptions, e.g. that API and frontend are available under the same domain.
## Development

### Frontend
Is written in angular + bootstrap.

To test the QR scanner on a phone, the page must be served over HTTPS (browsers block camera access on plain HTTP LAN addresses). Run `npm run dev:https` from the repository root; it generates a self-signed certificate for your LAN IP (including the IP in `client/.ssl/`) and serves the client at `https://<your-lan-ip>:4200`. Open that URL on the phone and trust/install the certificate once so the camera permission prompt can appear.

### Backend
Uses NextJS + PostgreSQL with JWT as cookies.