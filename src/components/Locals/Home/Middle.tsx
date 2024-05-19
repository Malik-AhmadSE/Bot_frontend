'use client'
import React from 'react';

type Props = {};

function Middle({}: Props) {
  return (
    <>    
    <div className="flex justify-center pt-4 gap-5">
      <div className="w-[50%] h-[600px] bg-zinc-800 rounded-3xl mt-10"></div>
      <div className=" w-4/5">
        <div className=" p-4 text-center">
          <h1 className=' text-[60px] font-semibold'>Heading</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, error sit nihil alias ipsum nisi ratione impedit! Ipsa eligendi consectetur, praesentium illo adipisci, ipsam eum possimus cupiditate neque perferendis quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero quasi accusamus reiciendis, aliquid optio nostrum eaque recusandae reprehenderit ipsam, et voluptas quibusdam autem cumque neque maxime! Suscipit, nam iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime culpa sapiente nisi perspiciatis sint impedit vel est, rerum animi cum debitis mollitia autem rem. Quo maiores blanditiis assumenda tempore laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ut, libero ducimus harum recusandae, atque placeat nihil est reprehenderit non sed labore esse nisi at impedit, iste nobis perspiciatis facere! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, beatae aspernatur. Excepturi aperiam rerum laboriosam at dolorum. Ex eos, asperiores tempore omnis doloribus iure sapiente? Sit optio quae nemo pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at, ea ratione accusamus provident fuga architecto reiciendis delectus minus ex ipsam! Saepe, quas dolorum deserunt quia voluptatem enim recusandae sit.</p>
        </div>
      </div>
    </div>
    <div className="flex justify-center pt-4 gap-5">
    <div className=" w-4/5">
        <div className=" p-4 text-center">
          <h1 className=' text-[60px] font-semibold'>Heading</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, error sit nihil alias ipsum nisi ratione impedit! Ipsa eligendi consectetur, praesentium illo adipisci, ipsam eum possimus cupiditate neque perferendis quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero quasi accusamus reiciendis, aliquid optio nostrum eaque recusandae reprehenderit ipsam, et voluptas quibusdam autem cumque neque maxime! Suscipit, nam iusto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime culpa sapiente nisi perspiciatis sint impedit vel est, rerum animi cum debitis mollitia autem rem. Quo maiores blanditiis assumenda tempore laudantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ut, libero ducimus harum recusandae, atque placeat nihil est reprehenderit non sed labore esse nisi at impedit, iste nobis perspiciatis facere! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, beatae aspernatur. Excepturi aperiam rerum laboriosam at dolorum. Ex eos, asperiores tempore omnis doloribus iure sapiente? Sit optio quae nemo pariatur!</p>
        </div>
      </div>
      <div className="w-[50%] h-[400px] bg-zinc-800 rounded-3xl mt-10"></div>
    </div>
    </>

  );
}

export default Middle;
