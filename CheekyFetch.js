  fetch('https://PawnDaring.github.io/CheekyChap.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('button-container').innerHTML = html;
    });
