import { ChangeEvent, FormEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useGetCommentsQuery, usePostCommentMutation } from '@/redux/features/products/product.api';

interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [postComment, { isLoading, isError, isSuccess }] =
    usePostCommentMutation();
  const { data: dummyComments } = useGetCommentsQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  }); // Here refetchOnMountOrArgChange will refetch the data when the component is mounted or when the id changes. pollingInterval will refetch the data every 10 seconds. and pollingInterval will refetch the data every 10 seconds.

  console.log({ isLoading, isError, isSuccess });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataOption = {
      id,
      commentData: { comment: inputValue },
    };

    postComment(dataOption);

    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {dummyComments &&
          dummyComments.comments &&
          Array.isArray(dummyComments.comments) &&
          dummyComments.comments.length > 0 &&
          [...dummyComments.comments]
            .reverse()
            .map((comment: string, index: number) => (
              <div key={index} className="flex gap-3 items-center mb-5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{comment}</p>
              </div>
            ))}
      </div>
    </div>
  );
}
