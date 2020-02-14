## Generate a multi size .ico file using ImageMagick

First install ImageMagick

### Mac OS X
```
brew install imagemagick
```

Then run this command
```
convert favicon.png -define icon:auto-resize:64,48,32,24,16 favicon.ico
```
