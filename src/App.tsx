import React, { useState, useEffect, useCallback, memo } from "react";
import "./App.css";

interface Bookmark {
  id: number;
  title: string;
  url: string;
  category: string;
}

/* 书签卡片组件（去掉 hover state，纯 CSS） */
const BookmarkCard = memo(function BookmarkCard({
  title,
  url,
  category,
}: Bookmark) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = useCallback(() => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 180);
  }, []);

  return (
    <article className={`card bookmark-item ${isClicked ? "clicked" : ""}`}>
      <div className="card-header">
        <h3 className="bookmark-title">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bookmark-link"
            onClick={handleClick}
          >
            {title}
          </a>
        </h3>
      </div>

      <div className="card-body">
        <span className="category-tag">{category}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="visit-link"
          onClick={handleClick}
        >
          <span className="visit-icon">→</span> 访问链接
        </a>
      </div>

      <div className="card-footer">
        <span className="url-preview">{new URL(url).hostname}</span>
      </div>
    </article>
  );
});

function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [compactMode, setCompactMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const bookmarks: Bookmark[] = [
    { id: 1, title: "React 文档", url: "https://react.dev", category: "开发" },
    {
      id: 2,
      title: "TypeScript 文档",
      url: "https://typescriptlang.org",
      category: "开发",
    },
    {
      id: 3,
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      category: "开发",
    },
    { id: 4, title: "知乎", url: "https://zhihu.com", category: "阅读" },
    { id: 5, title: "掘金", url: "https://juejin.cn", category: "阅读" },
    { id: 6, title: "GitHub", url: "https://github.com", category: "开发" },
  ];

  const categories = [
    "all",
    ...Array.from(new Set(bookmarks.map((b) => b.category))),
  ];

  const filteredBookmarks =
    activeCategory === "all"
      ? bookmarks
      : bookmarks.filter((b) => b.category === activeCategory);

  /* 分类切换动画节流 */
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 400);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div className="app-container">
      {/* 侧边栏 */}
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2 className={sidebarCollapsed ? "hidden" : ""}>书签分类</h2>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed((v) => !v)}
          >
            {sidebarCollapsed ? "›" : "‹"}
          </button>
        </div>

        <ul className="category-list">
          {categories.map((category) => (
            <li
              key={category}
              className={`category-item ${
                activeCategory === category ? "active" : ""
              } ${sidebarCollapsed ? "collapsed" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              <span
                className={`category-text ${sidebarCollapsed ? "hidden" : ""}`}
              >
                {category === "all" ? "全部书签" : category}
              </span>
              <span
                className={`category-count ${sidebarCollapsed ? "hidden" : ""}`}
              >
                (
                {category === "all"
                  ? bookmarks.length
                  : bookmarks.filter((b) => b.category === category).length}
                )
              </span>
            </li>
          ))}
        </ul>
      </aside>

      {/* 内容区 */}
      <main
        className={`bookmark-content ${sidebarCollapsed ? "expanded" : ""}`}
      >
        <div className="content-header">
          <h1>
            {activeCategory === "all" ? "全部书签" : activeCategory} (
            {filteredBookmarks.length})
          </h1>

          <button
            className={`compact-toggle ${compactMode ? "active" : ""}`}
            onClick={() => setCompactMode((v) => !v)}
          >
            {compactMode ? "🌐" : "📋"}
          </button>
        </div>

        <div
          className={`bookmark-grid ${compactMode ? "compact" : ""} ${
            isAnimating ? "fade-in" : ""
          }`}
        >
          {filteredBookmarks.length ? (
            filteredBookmarks.map((b) => <BookmarkCard key={b.id} {...b} />)
          ) : (
            <div className="empty-state">该分类下暂无书签</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
