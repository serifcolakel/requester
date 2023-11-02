import { IoIosNotificationsOutline } from 'react-icons/io';
import { Settings } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

export function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="px-2" variant="outline">
          <IoIosNotificationsOutline className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 space-y-2 w-80">
        <div className="flex flex-row items-center justify-between">
          <Label htmlFor="search">Notifications</Label>
          <Settings className="w-5 h-5" />
        </div>
        <Tabs className="w-[400px]" defaultValue="direct">
          <TabsList>
            <TabsTrigger value="direct">Direct (0)</TabsTrigger>
            <TabsTrigger value="watching">Watching</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <TabsContent value="direct">
            <div className="flex flex-col">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="watching">Change your watching here.</TabsContent>
          <TabsContent value="all">Change your All here.</TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
