const data = [
    { title: 'Tech Innovations in 2024', category: 'technology', date: '2024-11-20', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'How to Stay Healthy', category: 'health', date: '2024-09-15', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Best Lifestyle Habits', category: 'lifestyle', date: '2023-12-01', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Latest Tech Trends', category: 'technology', date: '2024-08-01', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { title: 'Mental Health Awareness', category: 'health', date: '2023-10-10', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
  ];

  function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const dateFilter = document.getElementById('date-filter').value;

    let filteredData = data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query);
      const matchesCategory = categoryFilter ? item.category === categoryFilter : true;
      const matchesDate = filterByDate(item.date, dateFilter);

      return matchesSearch && matchesCategory && matchesDate;
    });

    displayResults(filteredData);
  }

  function filterByDate(itemDate, filter) {
    const itemDateObj = new Date(itemDate);
    const now = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    switch (filter) {
      case 'last-week':
        return itemDateObj >= oneWeekAgo;
      case 'last-month':
        return itemDateObj >= oneMonthAgo;
      case 'last-year':
        return itemDateObj >= oneYearAgo;
      default:
        return true;
    }
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
      results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
          <h3>${item.title}</h3>
          <p><strong>Category:</strong> ${item.category} | <strong>Date:</strong> ${new Date(item.date).toLocaleDateString()}</p>
          <p>${item.content}</p>
        `;
        resultsContainer.appendChild(resultItem);
      });
    }
  }

  window.onload = () => {
    displayResults(data);
  };