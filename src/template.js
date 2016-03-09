module.exports = (events, config) =>`
  <div class="gh-events-widget">
    <div class="header">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAACE0lEQVR4XsWW4W3iQBCFjZUC6CCbCs6IAoAKjg5iKri4AqAC6MDpIFwFNgUg0kGcCuIOcrPos/S0K+zzn7uVnpbR7ry3452ZZZIMjPl8ntm0NiwMDvjRgLPh9XK5NH08kx6BpU1bg81/NWrD3gTrQSEEpgi8yEJrOBk+IUw4wCPRToXiiGB7VwiRypCx3uD0OvB5c6J3LLwbViqW9oh48lmvCGDPDJ8EjurGqUJgKyIbczZI+MNirffxviK2jS7e8A1KifLN8GUo5XTRnRp27LviVwrfLZkeumjkTgrhWTPnBn+Ytota7mLa3Y2sFSSLg7tOqRNSOMoWrQ2nIkLsguxM4Njjt/QaqZy61YtXoRF4DxKkxVx7oQXGKbg3R6RjxhK/JOBcpBL6J7Nm4fiBX8DpVChsHW60ROxXi9A/GKR3Q1TP1AqZRf8aj1tdYfxgblKEupAby5adh9TTWBTC0arQGSOzRU3PmloYMzb4hQV/vj1s0i5ygzMc/CztqZI9EVhfqiJcrJPyQvRB7yq731E/jJHd6X8frFfavfdyTwe6sB9XGubBjLeBulEc4IJbHj7IXjA3tJNqKPu4z0nwCJaYR1srJCKU6VVs/GV4gmQW9L6j2Pq5yk4ELpIJIem4KxHL+XS5RFUw/1abPVd8+p9yFZMTO6KrsH8G786zfAEn0SLy//9uxaAG8oE/kCeK/e74A3EqFEl9t0n9AAAAAElFTkSuQmCC">
    Github activity of <a href="https://github.com/${config.user}">@${config.user}</a></div>
    ${events.map(event => `
      <div class="event">
        <span class="text">${event.text}</span>
        <span class="date">${event.date}</span>
        <span class="link"><a href="${event.url}">Details »</a></span>
        <div style="clear:both"></div>
      </div>
      `)
    .join('')}
  </div>
`;
