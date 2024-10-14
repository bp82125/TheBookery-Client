import {
  HomeIcon,
  BookUser,
  BookOpenText,
  Users,
  Newspaper,
  CircleUser,
  NotepadText
} from 'lucide-vue-next'

export const navItems = [
  { name: 'Trang chủ', icon: HomeIcon, route: '/dashboard/home' },
  { name: 'Sách', icon: BookOpenText, route: '/dashboard/book' },
  { name: 'Nhà xuất bản', icon: Newspaper, route: '/dashboard/publisher' },
  { name: 'Đọc giả', icon: BookUser, route: '/dashboard/reader' },
  { name: 'Nhân viên', icon: Users, route: '/dashboard/employee' },
  { name: 'Tài khoản', icon: CircleUser, route: '/dashboard/account' },
  { name: 'Theo dõi mượn sách', icon: NotepadText, route: '/dashboard/book-tracking' }
]
