import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppSelector } from "@/store/hooks";

export function PreviewProduct() {
  const { imageUrls } = useAppSelector((state) => state.previewUrls);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className=" bg-orange-500">Preview</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-20">
          <DrawerHeader>
            {/* <DrawerTitle>Shoes</DrawerTitle>
            <DrawerDescription>Some description</DrawerDescription> */}
          </DrawerHeader>
          <div className="flex items-center h-20">
            {imageUrls.map((url) => {
              return (
                <img
                  src={url}
                  alt="preview image"
                  key={url}
                  className=" object-contain overflow-hidden"
                />
              );
            })}
          </div>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            {/* <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
