import Link from 'next/link'
import { useRouter } from 'next/router'

export default function BottomNav() {
    const router = useRouter()
    const isActive = (path) => router.pathname === path

    const navItems = [
        { icon: '🏠', path: '/' },
        { icon: '🎵', path: '/top20' },
        { icon: '👤', path: '/perfil' },
    ]

    const activeIndex = navItems.findIndex(item => isActive(item.path))

    const getGradientStyle = () => {
        if (activeIndex === -1) return { background: 'rgb(31, 41, 55)' }

        const position = (activeIndex / (navItems.length - 1)) * 100

        return {
            background: `linear-gradient(90deg, 
                rgba(31, 41, 55, 1) 0%,
                rgba(54, 123, 54, 0.8) ${Math.max(0, position - 20)}%,
                rgba(54, 123, 54, 1) ${position}%,
                rgba(54, 123, 54, 0.8) ${Math.min(100, position + 20)}%,
                rgba(31, 41, 55, 1) 100%
            )`
        }
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 text-white flex justify-around items-center py-3 px-4 shadow-lg transition-all duration-500 rounded-t-2xl"
            style={getGradientStyle()}
        >
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.path}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${isActive(item.path) ? 'scale-110' : 'hover:bg-gray-700/50'
                        }`}
                >
                    <span className="text-3xl">{item.icon}</span>
                </Link>
            ))}
        </div>
    )
}
