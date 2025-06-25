'use client';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import clsx from 'clsx';
import {
  Edit,
  FileSpreadsheet,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useMeals, useSingleMealQuery } from '@/hooks/use-reactquery-meal';
import { baseUrl } from '@/types/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useCategories,
  useSingleCategory,
} from '@/hooks/use-reactquery-category';

export default function CategoriesTable({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const { allCategories } = useCategories();
//   const { getSingleCategory } = useSingleCategory(slug);
  const { updateMeal } = useMeals();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();

  // Filter sales persons based on search query
  const filteredMeals = useMemo(() => {
    if (!searchQuery.trim()) return allCategories;

    const query = searchQuery.toLowerCase();
    return allCategories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query),
    );
  }, [allCategories, searchQuery]);

  // Export to Excel
  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      // Prepare data for export
      const exportData = filteredMeals.map((category) => ({
        Name: category.name,
        'Date Added': formatDate(category.createdAt),
      }));

      // Create workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesPersons');

      // Generate filename with current date
      const fileName = `SalesPersons_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;

      // Export to file
      XLSX.writeFile(workbook, fileName);

      toast.success('Export successful', {
        description: `Sales persons exported to ${fileName}`,
      });
    } catch (error) {
      toast.error('Export failed', {
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Handle edit click
//   async function handleEditClick (meal: MealPropTypes) {
//     setIsAddingNew(false);
//     router.push(`/dashboard/meals/${meal.slug}`)
//   };

  // Handle add new click
  const handleAddNewClick = () => {
    setIsAddingNew(true);
  };

  // Handle delete click
  async function handleDeleteClick(categorySlug: string) {
    try {
      if (categorySlug) {
        setIsDeleting(categorySlug);
      }
      const response = await fetch(
        `${baseUrl}/api/v1/categoryAPI/${categorySlug}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      console.log(response), 'Jesus';
      if (response.ok) {
        setIsDeleting(null);
        toast.success('Category Deleted successfully...✅');
        console.log(response);
        router.push('/dashboard/view-all-categories');
      } else {
        setIsDeleting(null);
        toast.error('Failed To Delete Category...!!!🥺');
        console.log(response);
      }
    } catch (error) {
      setIsDeleting(null);
      toast.error('Failed to delete category', {
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page and neighbors, and last page
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Middle
        pageNumbers.push(1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('ellipsis');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <>
      <Card className={clsx('w-full')}>
        <CardHeader
          className={clsx('flex flex-row items-center justify-between')}
        >
          <div>
            <CardTitle className={clsx('text-2xl')}>{title}</CardTitle>
            <p className={clsx('text-muted-foreground mt-1')}>
              {filteredMeals.length}{' '}
              {filteredMeals.length === 1 ? 'category' : 'categories'}
            </p>
          </div>
          <Button
            className="bg-green-600/95 hover:bg-green-300/95"
            onClick={handleAddNewClick}
          >
            <Link href="/dashboard/categories">Add Category</Link>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search and Export */}
          <div className={clsx('flex items-center justify-between mb-4')}>
            <div className={clsx('relative max-w-sm')}>
              <Search
                className={clsx(
                  'absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground',
                )}
              />
              <Input
                placeholder="Search Categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={clsx('pl-8 w-full md:w-80')}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx('absolute right-1 top-1.5 h-6 w-6')}
                  onClick={() => setSearchQuery('')}
                >
                  <X className={clsx('h-4 w-4')} />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={exportToExcel}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className={clsx('mr-2 h-4 w-4 animate-spin')} />
                  Exporting...
                </>
              ) : (
                <>
                  <FileSpreadsheet className={clsx('mr-2 h-4 w-4')} />
                  Export to Excel
                </>
              )}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Image</TableHead>
                <TableHead>Category Title</TableHead>
                {/* <TableHead>Meal Price</TableHead> */}
                {/* {/* <TableHead>Sales Count</TableHead> */}
                {/* <TableHead>Meal Price In Uganda</TableHead> */}
                <TableHead>Date Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCategories.length > 0 ? (
                allCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className={clsx('font-medium')}>
                      <Card className="w-12 h-12 rounded overflow-hidden shadow-lg">
                        <img
                          className="h-full w-full object-fit-contain overflow-hidden"
                          src={category.images[0]}
                          alt={category.name}
                        />
                      </Card>
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    {/* <TableCell>{meal.price}</TableCell> */}
                    {/* <TableCell>{salesPerson.salesCount}</TableCell> */}
                    {/* <TableCell>{formatCurrency(meal.price)}</TableCell> */}
                    <TableCell>{formatDate(category.createdAt)}</TableCell>
                    <TableCell className={clsx('text-right')}>
                      <div className={clsx('flex justify-end gap-2')}>
                        <Link href={`/dashboard/categories/${category.slug}`}>
                          <Button
                            variant="outline"
                            size="icon"
                            // onClick={() => handleEditClick(meal.slug)}
                            title="Edit Category"
                          >
                            <Edit className={clsx('h-4 w-4')} />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className={clsx('text-destructive')}
                          onClick={() => handleDeleteClick(category.slug)}
                          disabled={isDeleting === category.slug}
                          title="Delete Category"
                        >
                          {isDeleting === category.slug ? (
                            <Loader2 className={clsx('h-4 w-4 animate-spin')} />
                          ) : (
                            <Trash2 className={clsx('h-4 w-4')} />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className={clsx('text-center py-6')}>
                    {searchQuery ? 'No matching categories found' : 'No category found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className={clsx('mt-4')}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={clsx(
                        currentPage === 1
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer',
                      )}
                    />
                  </PaginationItem>

                  {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={`page-${page}`}>
                        <PaginationLink
                          onClick={() => handlePageChange(page as number)}
                          className={clsx(
                            currentPage === page
                              ? 'bg-primary text-primary-foreground'
                              : 'cursor-pointer',
                          )}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={clsx(
                        currentPage === totalPages
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer',
                      )}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sales Person Modal (for both Edit and Add) */}
      {/* <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!isSaving) {
            setIsModalOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isAddingNew ? 'Add New Sales Person' : 'Edit Sales Person'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter sales person's name"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+25676xxxxxx"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@domain.com"
                        type="email"
                        {...field}
                        disabled={isSaving}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline" disabled={isSaving}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isAddingNew ? 'Adding...' : 'Saving...'}
                    </>
                  ) : isAddingNew ? (
                    'Add Sales Person'
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
