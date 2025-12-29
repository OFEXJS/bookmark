import { useState, useEffect } from 'react'
import './App.css'

interface Bookmark {
  id: number;
  title: string;
  url: string;
  category: string;
}

function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  
  // 示例书签数据
  const bookmarks: Bookmark[] = [
    { id: 1, title: 'React 文档', url: 'https://react.dev', category: '开发' },
    { id: 2, title: 'TypeScript 文档', url: 'https://typescriptlang.org', category: '开发' },
    { id: 3, title: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: '开发' },
    { id: 4, title: '知乎', url: 'https://zhihu.com', category: '阅读' },
    { id: 5, title: '掘金', url: 'https://juejin.cn', category: '阅读' },
    { id: 6, title: 'GitHub', url: 'https://github.com', category: '开发' },
  ];

  // 获取所有分类（包含'全部书签'选项）
  const categories = ['all', ...Array.from(new Set(bookmarks.map(b => b.category)))];

  // 根据选中的分类筛选书签
  const filteredBookmarks = activeCategory === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.category === activeCategory);

  // 分类切换动画效果
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* 分类侧边栏 */}
      <div className="sidebar">
        <h2>书签分类</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {categories.map(category => (
            <li 
              key={category}
              className={`category-item ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'all' ? '全部书签' : category}
            </li>
          ))}
        </ul>
      </div>

      {/* 书签内容区域 */}
      <div className="bookmark-content">
        <h1>{activeCategory === 'all' ? '全部书签' : activeCategory} ({filteredBookmarks.length})</h1>
        <div className={`bookmark-grid ${showAnimation ? 'fade-in' : ''}`}>
          {filteredBookmarks.map(bookmark => (
            <div key={bookmark.id} className="card bookmark-item">
              <h3><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.title}</a></h3>
              <p className={`category-tag ${bookmark.category}`}>{bookmark.category}</p>
              <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="visit-link">访问链接</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App