import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

export function PostCreateForm({
  className,
  errors = {},
  handelSubmit = () => {},
  inputs = {},
  handelChange = () => {},
  handelFileChange = () => {},
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Post</CardTitle>
          <CardDescription>Create New Post</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handelSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  required
                  name="title"
                  value={inputs.title}
                  onChange={handelChange}
                />
                {errors?.title && (
                  <p className="text-red-500">{errors?.title._errors[0]}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  type="text"
                  required
                  name="slug"
                  value={inputs.slug}
                  onChange={handelChange}
                />
                {errors?.slug && (
                  <p className="text-red-500">{errors?.slug._errors[0]}</p>
                )}
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  type="text"
                  required
                  name="author"
                  value={inputs.author}
                  onChange={handelChange}
                />
                {errors?.author && (
                  <p className="text-red-500">{errors?.author._errors[0]}</p>
                )}
              </div> */}
              <div className="grid gap-2">
                <Label htmlFor="image">Featured Image</Label>
                <Input
                  id="image"
                  type="file"
                  required
                  name="image"
                  onChange={handelFileChange}
                />
                {errors?.image && (
                  <p className="text-red-500">
                    {errors?.image._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  type="text"
                  required
                  name="shortDescription"
                  value={inputs.shortDescription}
                  onChange={handelChange}
                />
                {errors?.shortDescription && (
                  <p className="text-red-500">
                    {errors?.shortDescription._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description"> Description</Label>
                <Textarea
                  id="description"
                  required
                  name="description"
                  value={inputs.description}
                  onChange={handelChange}
                />
                {errors?.description && (
                  <p className="text-red-500">
                    {errors?.description._errors[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status"> Select Status --</Label>
                <Select
                  required
                  name="status"
                  id="status"
                  onChange={handelChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">In Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
