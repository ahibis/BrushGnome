# BrushGnome
the app for redaction images on web and windows.
### [LINK TO WEBSITE](https://ahibis.github.io/BrushGnome/)
![picture](/github/edit1.jpg)
### Old versions
* [0.1.0](https://github.com/ahibis/image-editor/tree/v0.1.0)
* [0.2.0](https://github.com/ahibis/image-editor/tree/v0.2.0)
* [0.2.3](https://github.com/ahibis/image-editor/tree/v0.2.3)
* [0.3.0](https://github.com/ahibis/image-editor/tree/v0.3.0)
## optimization
For optimization, I have tried several image and array processing methods, and for this project I am trying to use the best methods.
[my tests](https://github.com/ahibis/speedTestJs)
## Layers
Menu for layer choose

![layers](/github/layers.png)
## Params
![params](/github/params.png)
## Curves (faster method)
applies gradient transformation by changing the graph of the function.
the Lagrange polynomial is used as a function for the spline.
* click to add a new point
* pull to drag a point
* double click to remove a point

![img](/github/GTF.png)
## Curves
applies gradient transformation by changing the graph of the function.
It works like "Gradient transformation (faster method)", but when the spline changes, a histogram is drawn.
You can change calculation mode from CPU to GPU.

![img](/github/gt.png)
## Binarization
turns the picture into black and white
### Gavrilov method
at the beginning, the algorithm searches for the color of the average pixel. Then for each pixel, if the color is larger than the average pixel, then it becomes white, otherwise it becomes black.

![gavrilov](/github/Gavrilov.png)
### Otsu method
https://en.wikipedia.org/wiki/Otsu%27s_method

![gavrilov](/github/otsu.png)
## Options
![options](/github/Options.png)

* download - download image
* editor toggle - shows/hides the sprite editor in the right bar
* sprite list toggle - shows/hides the sprite list in the right bar

## Windows
You can open most redactor options at a separate window
![options](/github/windows.jpg)
![options](/github/windows.png)


## Roadmap
- [x] params for editing and transform image
- [x] use GPU to render images
- [x] windows version
- [x] gradient transformation
- [x] mask filter
- [x] movable and resizable sprites 
- [ ] binarization
- [ ] spatial filtering
- [ ] Frequency Filter 
- [ ] mobile version
- [ ] dark mode
- [ ] i18n
- [ ] other filters

### Launch project
1. download node 14+
2. npm i
3. npm run dev
## Scripts 
- yarn dev - launch dev version on browser
- yarn electron:dev - launch dev version on windows app 
- yarn electron - launch windows app 
- yarn build - build web project
- yarn build:docs - build web project for github pages
- yarn app:build - compile windows app

## Technologies used 
- vue 3
- pinia
- vite
- electron.js
- lodash.js
- vue chartjs
- bootstrap
- vuetify
- pixi.js
- GPU.js
- sass
