'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import TextInput from './text-input';
import TextArea from './text-area';
import SubmitButton from './submit-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CategoryFormData, categorySchema } from '@/schema/schema';
import MultipleImageInput from './multipleImageUpload';
import { useCategories } from '@/hooks/use-reactquery-category';
import { useRouter } from 'next/navigation';
import { Category } from '@prisma/client';
export default function CategoryForm({
  
  singleCategory,
}: {
  singleCategory: Category | null;
}) {

  const { createCategories } = useCategories();
  const { updateCategory } = useCategories();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: singleCategory?.name,
      description: singleCategory?.description,
      images: singleCategory?.images,
      slug: singleCategory?.slug,
    },
  });
  const [loading, setLoading] = useState(false);
  const initialImages = ['/placeholder.svg', '/placeholder.svg'];
  const [categoryImages, setCategoryImages] = useState(initialImages);
  // Check if we have valid images (not placeholders and not empty)
  const validImages = categoryImages.filter(
    (image) => image && image !== '/placeholder.svg',
  );
  async function submitFormData(categoryData: CategoryFormData) {
    if (singleCategory) {
      try {
        updateCategory(
          {
            slug: singleCategory.slug,
            data: categoryData,
          },
          {
            onSuccess(categoryData) {
              setLoading(false);
              console.log(categoryData);
              toast.success('Category Has Been Updated Successfully');
              reset();
              router.push('/dashboard/view-all-categories');
            },
            onError(categoryData) {
              setLoading(false);
              console.log(categoryData);
              toast.success('Failed To Update Category');
              router.push('/dashboard/categories');
            }
          },
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      if (validImages.length < 2) {
        toast.error('Please upload at least 2 images for the category');
        return;
      }
      setLoading(true);
      categoryData.slug = categoryData.name.split(' ').join('-').toLowerCase();
      categoryData.images = validImages;
      createCategories(categoryData, {
        // console.log(categoryData);
        onSuccess: (categoryData) => {
          console.log(categoryData);
          setLoading(false);
          toast.success('Meal Category Has Been Created Successfully...✅');
          reset();
          router.push('/dashboard');
        },
        onError: (error) => {
          setLoading(false);
          console.error('Failed to create category:', error);
          toast.error('Failed To Create Meal Category...!!!🥺');
          router.push('/dashboard/categories');
        },
      });
      console.log('Submitting category data:', categoryData);
    }
  }
  return (
    <>
      <div
        className={cn(
          'w-full',
          'bg-white dark:bg-zinc-900/70',
          'border border-zinc-100 dark:border-zinc-800',
          'rounded-xl shadow-sm backdrop-blur-xl',
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3 border-b border-green-300 dark:border-zinc-800">
            <h2 className="text-2xl font-semibold text-green-900 dark:text-zinc-100">
              Here You Create The Meal Categories. Forexample BreakFasts, Lunch
              & Drinks
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(submitFormData)}
            className="space-y-1 flex flex-col-reverse gap-4 md:flex md:flex-row md:items-center md:justify-between md:gap-4"
          >
            <div className="w-full md:w-[75%]">
              <div
                className={cn(
                  'p-2 rounded-lg',
                  'bg-zinc-100 dark:bg-zinc-800',
                  'border border-zinc-200 dark:border-zinc-700',
                )}
              >
                <div className="">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="Category Name"
                    name="name"
                  />
                </div>
                <div className="">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Category Description"
                    name="description"
                  />
                </div>
                <div className="py-2">
                  <SubmitButton
                    className="w-full"
                    size={'sm'}
                    // title={editingId ? `Update ${title}` : `Save ${title}`}
                    title="Save Meal-Port Category"
                    loading={loading}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-[35%]">
              <div className="space-y-0.5">
                <MultipleImageInput
                  title="Category Images"
                  imageUrls={categoryImages}
                  setImageUrls={setCategoryImages}
                  endpoint="categoryImageUploader"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
