# telepon

> Telepon is a sane and easy-to-use JavaScript library to parse and format Indonesian telephone number from a string.

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

Parsing and formatting telephone number can be such an ass sometimes. Moreover, there's no way you can assume phone number validity just from their length and `0` prefix. Simply put, validating a phone number is not an easy task as you have consider all standards involved.

With `telepon`, not only you can format phone number easily, you can also parse a phone number from an unformatted strings easily! Moreover, this package has out-of-the-box support for TypeScript.

> ⚠️ **WARNING**: This package **DOES NOT** guarantee that the number is 100% callable. To do that, you have to test it yourself.

## Table of Contents

1. [Installation](#installation)
2. [Data Types](#data-types)
3. [Functions](#functions)
4. [License](#license)

## Installation

Install this package with your favorite package manager:

```shell
# using npm
npm install @namchee/telepon

# using yarn
yarn add @namchee/telepon

# using pnpm
pnpm add @namchee/telepon

# using bun
bun install @namchee/telepon

# using JSR
npx jsr add @namchee/telepon
```

## Data Types

| **Name**           | **Description**                                                         |
| ------------------ | ----------------------------------------------------------------------- |
| `EmergencyService` | An emergency service number, such as law enforcement, firefighter, etc. |
| `FixedTelepon`     | A fixed line telephone number                                           |
| `MobileTelepon`    | A mobile cellular telephone number                                      |

### Common Properties

These properties exists in all kind of `telepon`

| **Name**         | **Value**                      | **Description**                                   |
| ---------------- | ------------------------------ | ------------------------------------------------- |
| `type`           | `emergency \| fixed \| mobile` | Number type                                       |
| `originalNumber` | `string`                       | Represents parsed but unmodified telephone number |

### `EmergencyService` Properties

These properties only exist in `EmergencyService`

| **Name**      | **Value**   | **Description**                                         |
| ------------- | ----------- | ------------------------------------------------------- |
| `type`        | `emergency` | Self explanatory                                        |
| `description` | `string`    | Describes what kind of service that the number provides |

### `FixedTelepon` Properties

These properties only exist in `FixedTelepon`

| **Name**           | **Value**  | **Description**                 |
| ------------------ | ---------- | ------------------------------- |
| `type`             | `fixed`    | Self explanatory                |
| `unprefixedNumber` | `string`   | Telephone number without prefix |
| `prefix`           | `string`   | Region prefix                   |
| `region`           | `string[]` | List of possible regions        |
| `area`             | `number`   | Area code                       |

### `MobileTelepon` Properties

These properties only exist in `MobileTelepon`

| **Name**   | **Value** | **Description**  |
| ---------- | --------- | ---------------- |
| `type`     | `mobile`  | Self explanatory |
| `card`     | `string`  | Card type        |
| `provider` | `string`  | Service provider |

### Standard

To enhance formatting capabilites, this package provides an `enum` named `Standard` which lists all supported formattings on this package.

| **Name**          | **Description**                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Standard.E164`   | Format the number using the [E.164 Standard](https://www.itu.int/rec/T-REC-E.164/en). This is the default value. |
| `Standard.LOCAL`  | Format the number using a commonly used format, which is `(<region_prefix>) xxxx xxxx`                           |
| `Standard.DASHED` | Same as `Standard.LOCAL`, but separated with dash `-`.                                                           |

### Errors

| **Name**               | **Description**                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `AmbiguousNumberError` | Thrown when the number doesn't start with `0` or `+62` (if its not an `EmergencyService`) |
| `InvalidNumberError`   | Thrown when the number is not a valid phone number in Indonesia.                          |

## Functions
### `parse(number: string)`

Parse a telephone number from a `string`, which includes simple sanitizing and validation. Returns an instance of either `EmergencyService`, `FixedTelepon`, or `MobileTelepon`

### `parseAsEmergency(number: string)`

Forcefully parse a telephone number from a `string` as an `EmergencyService`. Will throw an error if the number is not an emergency service number.

### `parseAsFixedLine(number: string)`

Forcefully parse a telephone number from a `string` as an `FixedTelepon`. Will throw an error if the number is not a fixed line telephone number.

### `parseAsMobile(number: string)`

Forcefully parse a telephone number from a `string` as an `MobileTelepon`. Will throw an error if the number is not a cellular telephone number.

### `format(telepon: FixedTelepon | MobileTelepon, standard: Standard = Standard.E164)`

Format a fixed line telephone number or a mobile cellular telephone number to a specified standard. Please note the input **MUST** be parsed first.

### `tryFormat(telepon: FixedTelepon | MobileTelepon, standard: Standard = Standard.E164)`

Attempt to format a fixed line telephone number or a mobile cellular telephone number to a specified standard. The input will be parsed on demand, which basically calls the `parse` function.

Will throw an error if the number is invalid.

## License

This project is licensed under the [MIT license](./LICENSE)
