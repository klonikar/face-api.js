
function requestExternalImage(url, updateElemId, postProcFunction) {
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

    $(updateElemId).get(0).src = dataURL
    postProcFunction()
  }
  img.src = url || $('#imgUrlInput').val();
}

function renderNavBar(navbarId, exampleUri) {
  const examples = [
    {
      uri: 'face_landmarks_orig',
      name: 'Face Landmarks Original'
    },
    {
      uri: 'detect_and_draw_landmarks_orig',
      name: 'Detect And Draw Landmarks Original'
    },
    {
      uri: 'face_detection_video_orig',
      name: 'Face Detection Video Original'
    },
    {
      uri: 'face_detection',
      name: 'Face Detection'
    },
    {
      uri: 'face_landmark_detection',
      name: 'Face Landmark Detection'
    },
    {
      uri: 'face_expression_recognition',
      name: 'Face Expression Recognition'
    },
    {
      uri: 'age_and_gender_recognition',
      name: 'Age and Gender Recognition'
    },
    {
      uri: 'face_recognition',
      name: 'Face Recognition'
    },
    {
      uri: 'face_extraction',
      name: 'Face Extraction'
    },
    {
      uri: 'video_face_tracking',
      name: 'Video Face Tracking'
    },
    {
      uri: 'webcam_face_detection',
      name: 'Webcam Face Detection'
    },
    {
      uri: 'webcam_face_landmark_detection',
      name: 'Webcam Face Landmark Detection'
    },
    {
      uri: 'webcam_face_expression_recognition',
      name: 'Webcam Face Expression Recognition'
    },
    {
      uri: 'webcam_age_and_gender_recognition',
      name: 'Webcam Age and Gender Recognition'
    },
    {
      uri: 'bbt_face_landmark_detection',
      name: 'BBT Face Landmark Detection'
    },
    {
      uri: 'bbt_face_similarity',
      name: 'BBT Face Similarity'
    },
    {
      uri: 'bbt_face_matching',
      name: 'BBT Face Matching'
    },
    {
      uri: 'bbt_face_recognition',
      name: 'BBT Face Recognition'
    },
    {
      uri: 'batch_face_landmarks',
      name: 'Batch Face Landmark Detection'
    },
    {
      uri: 'batch_face_recognition',
      name: 'Batch Face Recognition'
    }
  ]

  const navbar = $(navbarId).get(0)
  const pageContainer = $('.page-container').get(0)

  const header = document.createElement('h3')
  header.innerHTML = examples.find(ex => ex.uri === exampleUri).name
  pageContainer.insertBefore(header, pageContainer.children[0])

  const menuContent = document.createElement('ul')
  menuContent.id = 'slide-out'
  menuContent.classList.add('side-nav', 'fixed')
  navbar.appendChild(menuContent)

  const menuButton = document.createElement('a')
  menuButton.href='#'
  menuButton.classList.add('button-collapse', 'show-on-large')
  menuButton.setAttribute('data-activates', 'slide-out')
  const menuButtonIcon = document.createElement('img')
  menuButtonIcon.src = 'menu_icon.png'
  menuButton.appendChild(menuButtonIcon)
  navbar.appendChild(menuButton)

  const li = document.createElement('li')
  const githubLink = document.createElement('a')
  githubLink.classList.add('waves-effect', 'waves-light', 'side-by-side')
  githubLink.id = 'github-link'
  githubLink.href = 'https://github.com/justadudewhohacks/face-api.js'
  const h5 = document.createElement('h5')
  h5.innerHTML = 'face-api.js'
  githubLink.appendChild(h5)
  const githubLinkIcon = document.createElement('img')
  githubLinkIcon.src = 'github_link_icon.png'
  githubLink.appendChild(githubLinkIcon)
  li.appendChild(githubLink)
  menuContent.appendChild(li)

  examples
    .forEach(ex => {
      const li = document.createElement('li')
      if (ex.uri === exampleUri) {
        li.style.background='#b0b0b0'
      }
      const a = document.createElement('a')
      a.classList.add('waves-effect', 'waves-light', 'pad-sides-sm')
      a.href = ex.uri
      const span = document.createElement('span')
      span.innerHTML = ex.name
      span.style.whiteSpace = 'nowrap'
      a.appendChild(span)
      li.appendChild(a)
      menuContent.appendChild(li)
    })

  $('.button-collapse').sideNav({
    menuWidth: 260
  })
}

function renderSelectList(selectListId, onChange, initialValue, renderChildren) {
  const select = document.createElement('select')
  $(selectListId).get(0).appendChild(select)
  renderChildren(select)
  $(select).val(initialValue)
  $(select).on('change', (e) => onChange(e.target.value))
  $(select).material_select()
}

function renderOption(parent, text, value) {
  const option = document.createElement('option')
  option.innerHTML = text
  option.value = value
  parent.appendChild(option)
}
