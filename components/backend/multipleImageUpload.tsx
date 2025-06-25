"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import React from "react";
type ImageInputProps = {
title: string;
imageUrls: string[];
setImageUrls: any;
endpoint: any;
};
export default function MultipleImageInput({
title,
imageUrls,
setImageUrls,
endpoint,
}: ImageInputProps) {
// console.log(imageUrls);
return (
<Card className="overflow-hidden">
  <CardHeader>
    <CardTitle className="border-b border-green-300 pb-2">{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Card className="overflow-hidden h-40">
        <Image
          alt={title}
          className="h-full w-full object-cover object-center"
          height={400}
          src={imageUrls[0]}
          width={400}
        />
      </Card>
      <div className="grid grid-cols-2 gap-2">
        {imageUrls.map((imageUrl: string, i: number) => {
          return (
            <Card className="overflow-hidden" key={i}>
              <Image
                alt="category image"
                className="h-24 w-full rounded-sm object-cover"
                height="84"
                src={imageUrl}
                width="84"
              />
            </Card>
          );
        })}
      </div>
      <UploadButton
        className="ut-button:bg-green-600 ut-button:w-full"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          // console.log(
          //   "Files: ",
          //   res.map((item) => item.url)
          // );
          setImageUrls(res.map((item) => item.url));
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  </CardContent>
</Card>
);
}
 