const dataContainer = document.getElementById('data-container');
const categorySelect = document.getElementById('category-select');
const searchInput = document.getElementById('search-input');
const statContainer = document.getElementById('stat-container');
const searchBlogs = document.getElementById('search-button');

// searchBlogs = (keyword, blogs) => {
//   return blogs.filter(blog => blog.title.toLowerCase().includes(keyword.toLowerCase()));
// };

function renderBlogs(blogs) {
  dataContainer.innerHTML = '';

  blogs.forEach(blog => {
    const blogElement = document.createElement('div');
    blogElement.classList.add(
      'bg-white', 
      'shadow-md', 
      'rounded-lg', 
      'p-6',
      'text-center',
      'm-2'
    );

    const titleElement = document.createElement('h2');
    titleElement.classList.add('text-xl', 'font-semibold', 'my-3');
    titleElement.textContent = blog.title;

    const categoryElement = document.createElement('p');
    categoryElement.classList.add('text-gray-600', 'text-sm', 'mb-2');
    categoryElement.textContent = `Category: ${blog.category}`;

    const contentElement = document.createElement('p');
    contentElement.classList.add('text-gray-800', 'mb-4');
    contentElement.textContent = blog.content;

    const authorElement = document.createElement('p');
    authorElement.classList.add('text-purple-500', 'text-sm', 'mb-1');
    authorElement.textContent = `Author: ${blog.author}`;

    const viewsElement = document.createElement('p');
    viewsElement.classList.add('text-gray-700', 'text-sm');
    viewsElement.textContent = `Views: ${blog.views}`;

    const readMoreButton = document.createElement('button');
    readMoreButton.setAttribute(
      'id', 'readMoreButton'
    );
    readMoreButton.classList.add(
      'bg-violet-500',
      'hover:bg-violet-700',
      'text-white',
      'fond-semibold',
      'py-2', 'px-4',
      'rounded',
      'm-4');
    readMoreButton.textContent = 'Read More';
    readMoreButton.addEventListener('click', () => {
      window.location.href=`blog-page.html`;
    });

    blogElement.appendChild(titleElement);
    blogElement.appendChild(categoryElement);
    blogElement.appendChild(contentElement);
    blogElement.appendChild(authorElement);
    blogElement.appendChild(viewsElement);
    blogElement.appendChild(readMoreButton);

    dataContainer.appendChild(blogElement);
  });
}

fetch('JS/stat.json')
  .then(response => response.json())
  .then(data => {
    const { totalBlogs, totalViews } = data.statistics;
    statContainer.textContent = `
    Total blogs: ${totalBlogs} - Views: ${totalViews}
    `;
  })
  .catch(error => {
    console.log('Error: ', error)
  });

fetch('JS/blog.json')
  .then(response => response.json())
  .then(data => {    
    renderBlogs(data.blogs);
    categorySelect.addEventListener('change', () => {
      const selectedCategory = categorySelect.value;
      if (selectedCategory) {
        const filteredBlogs = data.blogs.filter(blog => blog.category === selectedCategory);
        renderBlogs(filteredBlogs);
      } else {
        renderBlogs(data.blogs);
      }
    });

    searchBlogs.addEventListener('click', () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredBlogs = data.blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        blog.category.toLowerCase().includes(searchTerm) ||
        blog.author.toLowerCase().includes(searchTerm)
      );
      renderBlogs(filteredBlogs);
    });
  })
  .catch(error => {
    console.log('Error: ', error)
  });