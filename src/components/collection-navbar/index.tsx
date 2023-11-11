import { BsThreeDots } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Folder, Plus } from 'lucide-react';

import ListWrapper from '@components/list-wrapper';
import { Input } from '@components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

import paths from '@routes/paths';

import useCollections from '@hooks/useCollections';

export default function CollectionNavbar() {
  const { collections, create, loading, search, setSearch } = useCollections();

  return (
    <nav className="flex flex-col w-4/12 py-8 bg-gray-50 gap-y-2 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex flex-row items-center justify-between px-2 py-4 gap-x-2">
        <TooltipProvider key="new collection">
          <Tooltip>
            <TooltipTrigger>
              <Plus className="w-6 h-6" onClick={() => create()} />
            </TooltipTrigger>
            <TooltipContent>Add new collection</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          className="h-8"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          value={search}
        />
        <BsThreeDots className="w-6 h-6" />
      </div>
      <ListWrapper isEmpty={collections.length === 0} loading={loading}>
        <section className="px-1 space-y-1">
          {collections.map((collection) => (
            <NavLink
              key={collection.id}
              to={`${paths.collectionDetail.replace(':id', collection.id)}`}
            >
              {({ isActive }) => {
                const isMatchPathname =
                  window.location.pathname ===
                  `${paths.collections}/${collection.id}`;

                return (
                  <>
                    <div
                      className={clsx(
                        'group flex flex-row items-center gap-x-2 px-4 py-2 rounded-md z-0',
                        'hover:bg-gray-100 dark:hover:bg-gray-700',
                        'transition-colors duration-300 ease-in-out text-xs',
                        'dark:text-gray-100 text-muted-foreground',
                        isMatchPathname && 'bg-gray-100 dark:bg-gray-700'
                      )}
                    >
                      <Folder size={18} />
                      {collection.name}
                    </div>
                    {isActive ? (
                      <div>
                        {collection.requests.map((request) => (
                          <NavLink
                            className={({ isActive: subActive }) =>
                              clsx(
                                'group flex items-center flex-col justify-between gap-x-2 px-4 py-2 rounded-md z-0',
                                'hover:bg-gray-100 dark:hover:bg-gray-700',
                                'transition-colors duration-300 ease-in-out',
                                'dark:text-gray-100 text-muted-foreground',
                                subActive && 'bg-gray-100 dark:bg-gray-700 '
                              )
                            }
                            key={request.id}
                            to={`${paths.requestDetail
                              .replace(':id', request.id)
                              .replace(':collectionId', collection.id)}`}
                          >
                            {() => (
                              <div
                                className={clsx(
                                  'w-10/12 text-xs truncate hover:text-gray-800'
                                )}
                              >
                                {request.method} - {request.name}
                              </div>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    ) : null}
                  </>
                );
              }}
            </NavLink>
          ))}
        </section>
      </ListWrapper>
    </nav>
  );
}
