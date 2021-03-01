# Namchee's Boilerplate

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts) [![devDependencies](https://img.shields.io/david/dev/namchee/namchee-boilerplate)](https://david-dm.org/namchee/namchee-boilerplate?type=dev)

Sebuah _boilerplate_ sederhana untuk project _backend_ NodeJS dengan menggunakan Typescript dan ESLint

## Fitur

1. Config Typescript _all-in-one_, tinggal pakai
2. Config ESLint dengan [_preset_ Google](https://github.com/google/gts), namun tidak terlalu _strict_ dan di _fine-tune_ lebih lanjut
3. Update _dependency_ berkala
4. [TypeSync](https://github.com/jeffijoe/typesync) untuk mempermudah instalasi _types_ yang dibutuhkan TypeScript

## Instalasi

1. Clone repo ini atau eksekusi `git clone https://github.com/Namchee/namchee-boilerplate.git` di terminal. Untuk pengguna GitHub, dapat juga menggunakan repo ini sebagai _template_ repo untuk mempermudah _development_
2. Ketik `npm install` atau `yarn` pada terminal anda
3. Install _dependencies_ lain yang anda butuhkan dalam proses _development_
4. Atur [tsconfig](tsconfig.json) sesuai kebutuhan, termasuk `include` dan `exclude` supaya tidak bermasalah pada proses _build_

## FAQ

### Mengapa tidak menggunakan `webpack`?

Karena _server-side_ JavaScript tidak membutuhkan _bundling_. `webpack` masuk akal pada _front-end_ karena browser tidak memiliki _module_, sedangkan NodeJS memiliki `require` sebagai _module system_ mereka.

### Mengapa tidak menggunakan `babel`?

Karena _server-side_ JavaScript tidak memerlukan _transpile_. Developerlah yang seharusnya mengontrol versi Node yang digunakan sesuai kebutuhan aplikasi.

### Seberapa sering _update_ dependency dilakukan?

Sesering yang saya bisa, setidaknya 2 minggu sekali.

## Lisensi

_Boilerplate_ ini menggunakan lisensi [MIT](LICENSE)
