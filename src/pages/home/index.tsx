import { Link } from 'react-router-dom';

import { ModeToggle } from '@components/mode-toogle';
import { Notifications } from '@components/notifications';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';

import paths from '@routes/paths';

import { Logo } from '@assets/Icons';

export default function Component() {
  return (
    <div className="flex flex-col w-screen h-screen bg-white dark:bg-zinc-900">
      <nav className="flex items-center justify-between px-6 py-2 border-b border-zinc-200 dark:border-zinc-800">
        <Link className="flex items-center space-x-2" to={paths.dashboard}>
          <Logo className="p-2 text-white rounded-full bg-primary" size={60} />
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Notifications />
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 overflow-auto border-r border-zinc-200 dark:border-zinc-800">
          <nav className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400">
              Filters
            </h2>
            <div className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="sessions">Sessions</SelectItem>
                  <SelectItem value="bounce_rate">Bounce Rate</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-4 overflow-auto">
          <div className="grid gap-4">
            <div className="rounded-lg h-96 bg-zinc-100 dark:bg-zinc-800" />
            <div className="rounded-lg h-96 bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 xl:grid-cols-3">
            <div className="h-64 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-64 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-64 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </main>
      </div>
      <footer className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2023 Requster
        </p>
        <nav className="flex items-center space-x-4">
          <Link
            className="text-sm text-zinc-500 dark:text-zinc-400"
            to={paths.dashboard}
          >
            Terms
          </Link>
          <Link
            className="text-sm text-zinc-500 dark:text-zinc-400"
            to={paths.dashboard}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
