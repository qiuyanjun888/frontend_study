import { useState } from 'react'
import './App.css'

// 导入学习章节
import JSXExamples from './01_core/01_jsx'
import ComponentsExamples from './01_core/02_components'
import PropsExamples from './01_core/03_props'

// 定义导航结构 (按 README 学习计划组织)
const NAVIGATION = [
    {
        title: '基础部分 (核心)',
        chapters: [
            {
                id: 'core-concepts',
                title: '1. React 核心概念',
                items: [
                    { id: 'jsx', title: '1.1 JSX 语法', component: <JSXExamples /> },
                    { id: 'components', title: '1.2 组件基础', component: <ComponentsExamples /> },
                    { id: 'props', title: '1.3 Props 属性传递', component: <PropsExamples /> },
                ],
            },
            // 后续章节待开发...
            {
                id: 'hooks',
                title: '2. React Hooks (待开发)',
                items: [
                    { id: 'useState', title: '2.1 useState', component: <Placeholder title="useState" /> },
                    { id: 'useEffect', title: '2.2 useEffect', component: <Placeholder title="useEffect" /> },
                ],
            },
        ],
    },
]

function Placeholder({ title }: { title: string }) {
    return (
        <div className="placeholder">
            <h3>{title} 章节正在编写中...</h3>
            <p>稍后会更新对应的代码示例。</p>
        </div>
    )
}

function App() {
    const [activeId, setActiveId] = useState('jsx')

    // 展开/收起二级目录的状态 (默认全部展开)
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['core-concepts', 'hooks'])

    const toggleGroup = (id: string) => {
        setExpandedGroups(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
        )
    }

    // 扁平化所有项以便查找当前选中的内容
    const allItems = NAVIGATION.flatMap(nav =>
        nav.chapters.flatMap(chapter => chapter.items),
    )
    const activeItem = allItems.find(item => item.id === activeId) || allItems[0]

    return (
        <div className="layout">
            {/* 侧边栏 */}
            <aside className="sidebar">
                <header className="sidebar-header">
                    <h1>React Study Lab</h1>
                </header>

                <nav className="nav-container">
                    {NAVIGATION.map((section, sIdx) => (
                        <div key={sIdx} className="nav-section">
                            <div className="section-title">{section.title}</div>

                            {section.chapters.map((chapter) => (
                                <div key={chapter.id} className="chapter-group">
                                    <div
                                        className={`chapter-header ${expandedGroups.includes(chapter.id) ? 'expanded' : ''}`}
                                        onClick={() => toggleGroup(chapter.id)}
                                    >
                                        <span>{chapter.title}</span>
                                        <i className="chevron-icon"></i>
                                    </div>

                                    {expandedGroups.includes(chapter.id) && (
                                        <div className="chapter-items">
                                            {chapter.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`nav-link ${activeId === item.id ? 'active' : ''}`}
                                                    onClick={() => setActiveId(item.id)}
                                                >
                                                    {item.title}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </nav>

                <footer className="nav-footer">
                    <p>© 2024 React Learning Path</p>
                </footer>
            </aside>

            {/* 主展示区域 */}
            <main className="main-content">
                <header className="content-header">
                    <div className="breadcrumb">
                        主页 / {activeItem.title}
                    </div>
                    <h2>{activeItem.title}</h2>
                </header>

                <section className="content-body" key={activeId}>
                    {activeItem.component}
                </section>
            </main>
        </div>
    )
}

export default App
