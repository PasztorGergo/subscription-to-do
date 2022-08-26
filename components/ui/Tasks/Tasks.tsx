import { useUser } from '@/utils/useUser';
import React, { useEffect, useState } from 'react';
import s from './Tasks.module.css';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { postData } from '@/utils/helpers';
import { supabase } from '@/utils/supabase-client';
import { FaTrash } from 'react-icons/fa';

const Tasks = () => {
  const { user } = useUser();
  const { register, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<any> | null>([]);

  useEffect(() => {
    supabase
      .from('tasks')
      .select('*')
      .order('order')
      .then((x) => setTasks(x.data));
  }, [loading]);

  const uploadTask = async (task: string) => {
    try {
      setLoading(true);
      await fetch('/api/task', {
        body: JSON.stringify({
          task,
          order: tasks?.length,
          user_id: user?.id
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      toast.error(`An error occured: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      await fetch('/api/task', {
        body: JSON.stringify({
          taskId
        }),
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error: any) {
      toast.error(`An error occured: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const submitFunction = ({ task }: any) => {
    toast.promise(uploadTask(task), {
      loading: 'Uploading task',
      success: 'Task successfully added',
      error: (e) => `Error occured: ${e.message}`
    });
    reset();
  };

  return (
    <main className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
      <section>
        <h2 className={s.title}>Sub-To-Do</h2>
        <h3 className={s.subTitle}>
          Welcome back {user?.user_metadata.user_name}
        </h3>
        <form
          className={s.taskForm}
          onSubmit={handleSubmit((e) => submitFunction(e))}
        >
          <div className={s.container}>
            <label htmlFor="task">Task name</label>
            <input
              {...register('task')}
              id="task"
              className={s.input}
              type="text"
            />
          </div>
          <button disabled={loading} className={s.btn} type="submit">
            Add task
          </button>
        </form>
      </section>
      <section>
        <h2 className={s.title}>Your list</h2>
        {
          //@ts-ignore
          tasks.length > 0 ? (
            tasks?.map((x) => (
              <div
                className="px-3 py-2 ring-pink-500 ring-2 ring-opacity-50 rounded-lg flex justify-between items-center"
                key={x.id}
              >
                <p className="items-center">{x.task}</p>
                <button
                  className="bg-red-500 text-white text-opacity-70 p-3 rounded-lg"
                  onClick={() => deleteTask(x.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          ) : (
            <h3 className={s.subTitle}>You haven't added any tasks</h3>
          )
        }
      </section>
    </main>
  );
};

export default Tasks;
