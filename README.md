[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<br />
<div align="center">
  <a href="https://github.com/dan-online/bunnycdn-stream">
    <img src="https://github.com/dan-online/bunnycdn-stream/raw/main/assets/images/bunnycdn-stream.png?raw=true" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BunnyCDN-Stream</h3>

  <p align="center">
    A simple, lightweight, and easy to use library for BunnyCDN's stream api.
    <br />
    <a href="https://github.com/dan-online/bunnycdn-stream/blob/main/docs/classes/BunnyCdnStream-1.md">Documentation</a>
    ·
    <a href="https://github.com/dan-online/bunnycdn-stream/issues">Report Bug</a>
    ·
    <a href="https://github.com/dan-online/bunnycdn-stream/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][product-screenshot]

There are many bunnycdn modules for accessing bunnycdn storage yet none of them provide access to the `stream` endpoint, which requires seperate authentication. Therefore I decided to just write my own in typescript.

This was harder than you would think, a lot of bunnycdn's documentation is misnamed or just not documented. Therefore I had to experiment a lot but I believe I was able to make this library simple and easy to use.

### Built With

- [Axios](https://axios.com/)
- [Typescript](https://www.typescriptlang.org)
- [Rollup](https://rollupjs.org/guide/en/)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Install

- npm

  ```sh
  npm install bunnycdn-stream
  ```

- yarn
  ```sh
  yarn add bunnycdn-stream
  ```

## Usage

_For more examples, please refer to the [Documentation](https://github.com/dan-online/bunnycdn-stream/blob/main/docs/classes/BunnyCdnStream-1.md)_

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

The project is tested with `vitest` and requires you to have a library on your BunnyCDN account to send commands to the Bunny API. 

> Warning: all videos will be deleted during testing.

### Keys

```sh
BUNNY_VIDEO_LIBRARY=xxx BUNNY_API_KEY=xxx npm test
```

Also, `IGNORE_PRUNE=1` can be used to keep the testing video at the end of the tests for further manual checking.

<!-- LICENSE -->

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

DanCodes - [@dan-online](https://github.com/dan-online) - dan@dancodes.online

Project Link: [https://github.com/dan-online/bunnycdn-stream](https://github.com/dan-online/bunnycdn-stream)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Josh Core](https://github.com/josh-development/core) - For the project layout so I could easily write this module in a day without worrying about typescript issues

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/dan-online/bunnycdn-stream.svg?style=for-the-badge
[contributors-url]: https://github.com/dan-online/bunnycdn-stream/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dan-online/bunnycdn-stream.svg?style=for-the-badge
[forks-url]: https://github.com/dan-online/bunnycdn-stream/network/members
[stars-shield]: https://img.shields.io/github/stars/dan-online/bunnycdn-stream.svg?style=for-the-badge
[stars-url]: https://github.com/dan-online/bunnycdn-stream/stargazers
[issues-shield]: https://img.shields.io/github/issues/dan-online/bunnycdn-stream.svg?style=for-the-badge
[issues-url]: https://github.com/dan-online/bunnycdn-stream/issues
[license-shield]: https://img.shields.io/github/license/dan-online/bunnycdn-stream.svg?style=for-the-badge
[license-url]: https://github.com/dan-online/bunnycdn-stream/blob/master/LICENSE
[product-screenshot]: https://github.com/dan-online/bunnycdn-stream/raw/main/assets/images/demo.png?raw=true
