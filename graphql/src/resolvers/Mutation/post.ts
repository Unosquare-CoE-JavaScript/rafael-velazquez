import { Post, Prisma } from '@prisma/client';
import { Context } from '../..';

interface PostArgs {
  post: {
    title: string;
    content: string;
  };
}

interface PostPayload {
  userErrors: {
    message: string;
  }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'You must be logged in to create a post',
          },
        ],
        post: null,
      };
    }

    const { title, content } = post;

    if (title.length < 3 || !content) {
      return {
        userErrors: [
          {
            message:
              'Title must be at least 3 characters long and content is required',
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          authorId: userInfo.userId,
        },
      }),
    };
  },
  postUpdate: async (
    _: any,
    { postId, post }: { post: PostArgs['post']; postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'You must be logged in to update a post',
          },
        ],
        post: null,
      };
    }

    const { title, content } = post;
    if (!title && !content) {
      return {
        userErrors: [
          {
            message: 'Title or content is required',
          },
        ],
        post: null,
      };
    }

    const postExists = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      }
    });

    if (!postExists) {
      return {
        userErrors: [
          {
            message: 'Post does not exist',
          }
        ],
        post: null
      };
    }

    if (postExists.authorId !== userInfo.userId) {
      return {
        userErrors: [
          {
            message: 'You are not authorized to update this post',
          }
        ],
        post: null
      };
    }

    const postPayload = {
      title: title || postExists.title,
      content: content || postExists.content,
    }

    return {
      userErrors: [],
      post: prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          ...postPayload
        }
      })
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'You must be logged in to delete a post',
          },
        ],
        post: null,
      };
    }

    const postExists = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      }
    });

    if (!postExists) {
      return {
        userErrors: [
          {
            message: 'Post does not exist',
          }
        ],
        post: null
      };
    }

    if (postExists.authorId !== userInfo.userId) {
      return {
        userErrors: [
          {
            message: 'You are not authorized to delete this post',
          }
        ],
        post: null
      };
    }

    return {
      userErrors: [],
      post: prisma.post.delete({
        where: {
          id: Number(postId),
        }
      })
    };
  },
}