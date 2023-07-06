import { Icons } from "@/components/Icons";
import { BookOpen, Heart, MessagesSquare } from "lucide-react";
import Image from "next/image";
import defaultImg from '../../../public/default.svg';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const SinglePost = () => {
  return (
    <div className="container">
      <header className="grid justify-center text-center">
        <h1>What in the world is working will still work again</h1>
        <p className="flex items-center gap-4 not-prose">
          <Image
            src={defaultImg}
            width={24}
            height={24}
            className="rounded-full object-cover h-8 w-8"
            alt=""
          />
          <span>Complexlity</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 align-middle"></span>
          <span>Jul 5, 2023</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-600 align-middle"></span>

          <span className="flex gap-1">
            <BookOpen />9 min read
          </span>
        </p>
        <div className="flex mx-auto gap-6 items-center">
          <p className="px-6 py-2  bg-blueLight rounded-full text-blueDarkest font-bold hover:shadow-xl hover:shadow-gray-200">
            Technology
          </p>
          <HoverCard openDelay={5}>
            <HoverCardTrigger>
              <div className="flex gap-2 items-center bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-2 text-sm">
                <Icons.loveIcon className="h-6 w-6 fill-gray-300 text-slate-600 stroke-current" />
                <div className="flex max-w-10 items-center">
                  <Image
                    src={defaultImg}
                    width={24}
                    height={24}
                    className="cursor-pointer rounded-full object-cover h-8 w-8"
                    alt=""
                  />
                  <Image
                    src={defaultImg}
                    width={24}
                    height={24}
                    className="cursor-pointer rounded-full object-cover h-8 w-8"
                    alt=""
                  />
                  <Image
                    src={defaultImg}
                    width={24}
                    height={24}
                    className="cursor-pointer rounded-full object-cover h-8 w-8"
                    alt=""
                  />
                  +24
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="rounded-lg px-4 py-2 bg-black text-white" side='top'>
              27 people liked the post
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="bg-orange-400 w-[400px] h-[400px] mx-auto my-8">
          <Image
            src={defaultImg}
            width={24}
            height={24}
            className="rounded-full w-full h-full object-cover"
            alt=""
          />
        </div>
      </header>
      <main className="prose mx-auto relative">
        <h2>This is a header</h2>
        <blockquote>What are you saying about this now</blockquote>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          doloremque quis saepe sapiente blanditiis nisi quasi esse recusandae.
          Earum dolorum fuga hic incidunt, voluptas nihil amet labore neque
          voluptate dicta? Mollitia provident nihil fugit assumenda obcaecati
          harum iste cum eaque officiis dolorum consectetur possimus, minus,
          saepe necessitatibus sapiente qui, accusantium id. Iusto, ipsum ipsam
          labore id sint autem officiis aspernatur! Cumque exercitationem,
          perferendis amet laborum placeat unde, incidunt consequatur reiciendis
          ducimus asperiores cupiditate assumenda ipsam dicta et beatae nam
          sequi hic dolorum. Suscipit quo vel iusto assumenda quas, enim
          ratione? Fugiat quaerat delectus suscipit aut adipisci impedit
          voluptas placeat ab tenetur consectetur? Rem incidunt necessitatibus
          id at quae perferendis odit alias non, corporis dignissimos, atque ut
          optio quos commodi reiciendis! Sunt eveniet ullam quia! Nam ut officia
          unde rem! Libero id quidem quam assumenda eveniet consequuntur dolorum
          nobis ratione error illo? Repellendus quod repellat ut, atque qui
          neque dolore facilis! Soluta doloribus aperiam ad quam perferendis non
          debitis ut possimus itaque, quidem animi excepturi dolore voluptatibus
          iste praesentium earum molestiae labore dolor atque in autem unde
          officia numquam porro. Quo? Nihil soluta ipsum aut nesciunt deserunt
          eligendi corrupti doloremque, ullam quisquam at esse commodi deleniti
          reiciendis obcaecati. Odit facere voluptas recusandae, voluptates
          minima mollitia velit accusantium veritatis nemo, error ipsa. Dicta,
          minima rerum aspernatur, sed officiis laboriosam dolor ipsum fugiat
          repudiandae ut unde incidunt tempore illum, enim sequi vitae molestiae
          quidem distinctio tenetur. Ducimus inventore dolorem, quia
          voluptatibus beatae ipsa. Quas qui aspernatur, saepe id dolorum
          ratione debitis asperiores fuga, quo ullam adipisci architecto culpa
          quasi quod repudiandae ducimus possimus vero nobis non. Aspernatur rem
          sint neque dolorum quas nihil! Alias magnam perspiciatis quaerat,
          inventore asperiores velit molestias tempora incidunt quasi labore
          eligendi porro et, a recusandae excepturi rem tempore explicabo eaque
          itaque perferendis ipsum, hic esse dignissimos dolorum! Nobis.
        </p>
        <div className="sticky bottom-10 bg-white rounded-full items-center flex max-w-fit px-5 py-1 text-sm border-2 border-slate-200 mx-auto">
          <div className="flex gap-1 items-center">
            <div className="rounded-full p-2 hover:bg-gray-200">
              <Heart size={23}/>
            </div>
            <span>30</span>
          </div>
          <div className="w-0.5 h-6 mx-2 bg-slate-200"></div>
          <div className="flex gap-1 items-center">
            <div className="rounded-full p-2 hover:bg-gray-200">
              <MessagesSquare size={23}/>
            </div>
            <span>30</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SinglePost;