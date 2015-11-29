<p align="center">
    <img src="https://raw.githubusercontent.com/p1nga/RV4-Calibration/master/logo.png" width="400">
</p>

<p align="center">
    <a href="https://github.com/acemod/ACE3/releases">
        <img src="https://img.shields.io/badge/Version-0.0.1-blue.svg?style=flat-square" alt="Quixel RV4 Version">
    </a>
    <a href="https://github.com/p1nga/RV4-Calibration/releases/tag/1.0">
        <img src="https://img.shields.io/badge/Download-5.0_KB-green.svg?style=flat-square" alt="Quixel RV4 Download">
    </a>
    <a href="https://github.com/acemod/ACE3/issues">
        <img src="https://img.shields.io/github/issues-raw/p1nga/RV4-Calibration.svg?style=flat-square&label=Issues" alt="Quixel RV4">
    </a>
    <a href="https://github.com/p1nga/RV4-Calibration/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/License-GPLv3-red.svg?style=flat-square" alt="RV4-Calibration License">
    </a>
</p>

<p align="center">
    <sup><strong>Requires <a href="http://www.adobe.com/au/products/photoshop.html">Adobe Photoshop ©</a> and <a href="quixel.se">Quixel Suite ©.</a></sup></strong>
</p>

**RV4-Calibration** is a 'Calibration Profile' for **Quixel Suite**.  It was developed using Quixel Suite 2.0 but should be backwards compatible with all previous major releases.

The Calibration Profile can be utilized at two stages of the texturing process:
During project setup and creation withing DDO2 selecting 'Real Virtuality 4' will generate the correct texture types required for conversion to Real Virtuality 4 <a href="https://community.bistudio.com/wiki/Super_shader"> Supershader.</a>

During the export of textures selecting the 'Real Virtuality 4' preset will process the output textures to ones compatible with Real Virtuality 4.

At the moment Metalness Workflow is not supported, you should work in Spec/Gloss where possible for the best results.  The texture types output at the moment are 'Diffuse (co)', 'Normal (nohq)', Specular(smdi)' and 'Occlusion(as)', more may be included in the future as needs arise.

If not using the calibration profile to setup the project initially, you should ensure that the project includes Albedo, Gloss, Specular, Normal and AmbientOcclusion as a minimuim, any extra maps will not be exported using this calibration profile.

### Guides & how-tos
- Coming Soon

#### Contributing
You can help out with the ongoing development, To contribute simply fork this repository and submit your pull requests for review. 

#### Installing
The two files ***Real Virtuality 4.jsx*** and ***Real Virtuality 4.xml*** should be placed in: </br>
<< Program Files >>\Quixel SUITE 2.0\script\presets\Workflow\Games

