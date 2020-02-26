function onSelectedImageChanged(uri) {
  loadImageFromUrl(uri)
}

function loadImageFromUrl(url) {
  var img = new Image()
  img.crossOrigin = "anonymous";
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function() {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    $('#inputImg').get(0).src = dataURL
    updateResults()
  }
  img.src = url || $('#imgUrlInput').val();
}

function renderImageSelectList(selectListId, onChange, initialValue, withFaceExpressionImages) {
  let images = [1, 2, 3, 4, 5].map(idx => `bbt${idx}.jpg`)

  if (withFaceExpressionImages) {
    images = [
      'happy.jpg',
      'sad.jpg',
      'angry.jpg',
      'disgusted.jpg',
      'surprised.jpg',
      'fearful.jpg',
      'neutral.jpg'
    ].concat(images)
  }

  function renderChildren(select) {
    images.forEach(imageName =>
      renderOption(
        select,
        imageName,
        imageName
      )
    )
  }

  renderSelectList(
    selectListId,
    onChange,
    initialValue,
    renderChildren
  )
}

function initImageSelectionControls(initialValue = 'bbt1.jpg', withFaceExpressionImages = false) {
  renderImageSelectList(
    '#selectList',
    async (uri) => {
      await onSelectedImageChanged(uri)
    },
    initialValue,
    withFaceExpressionImages
  )
  onSelectedImageChanged($('#selectList select').val())
}