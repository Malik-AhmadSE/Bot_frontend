import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  
export default function Page() {
    return (
      <div className="w-full h-full"> 
        <ResizablePanelGroup
        direction="horizontal"
        className="w-full h-full border border-l-0 border-r-0 border-b-0"
      >
        <ResizablePanel>
          <div className="flex h-[1200px] items-center justify-center p-6">
            <span className="font-semibold">SubHeadings</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={5}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Intoduction</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={100}>
              <div className="flex h-full items-center justify-center text-justify p-6">
                <span className="font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam doloribus quis ea harum soluta, distinctio eos totam! Id explicabo numquam debitis molestias corporis, unde quo fuga porro, delectus assumenda veritatis? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt odio accusamus quibusdam. Harum minus, aliquid tenetur voluptatibus, ex consequatur nobis aspernatur, dolores et esse numquam ipsum! Rem corporis accusamus veniam!Lorem Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente atque libero autem facilis numquam molestias, possimus voluptate distinctio consectetur quos error neque vero reprehenderit adipisci! Eveniet perspiciatis dolores quos esse! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique incidunt ex ab doloremque tenetur. Aliquid obcaecati et dolore commodi quis. Consequuntur vel repudiandae enim vitae labore saepe deleniti beatae minus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quo cupiditate debitis nobis blanditiis animi, distinctio optio omnis obcaecati at accusantium iure necessitatibus, nulla porro earum fugiat amet sunt mollitia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed, laboriosam distinctio accusamus est, tempore accusantium, tenetur mollitia eaque qui natus illo! Doloribus, praesentium odio deserunt fuga consequuntur incidunt aspernatur asperiores. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab cupiditate facere nobis temporibus, obcaecati, quas sit quo, tenetur expedita exercitationem enim quis voluptatibus quisquam! Corrupti recusandae deserunt labore nisi provident. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, ipsam? Dignissimos blanditiis ipsa nulla qui assumenda deleniti impedit nobis deserunt molestias voluptas. Pariatur quibusdam inventore culpa doloribus dolores provident consequatur. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure officia corporis accusantium libero debitis exercitationem perferendis aspernatur tempora cupiditate deleniti fugit voluptatibus distinctio illum, saepe illo reprehenderit. Veritatis, repudiandae fugiat. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem officiis beatae error. Itaque delectus nam vel beatae perspiciatis aspernatur illum, quidem ipsa, accusantium veniam, repellat laborum? Accusantium magni eius fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nisi reprehenderit, minima magnam harum, quaerat aliquid, molestiae ea quae expedita tempora porro necessitatibus molestias. Non voluptas laboriosam ipsam minima veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore iste repudiandae incidunt, eos sit sunt veritatis distinctio ad? Ea totam odio recusandae esse expedita fuga eveniet dicta sit voluptates! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quisquam quae porro, vitae hic minus provident sint, autem laborum cumque facilis impedit perspiciatis blanditiis asperiores quidem quo distinctio ipsam corrupti? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum eaque illo similique aspernatur labore tempora reprehenderit sit possimus quia? Pariatur mollitia excepturi ipsa officiis esse numquam adipisci alias expedita optio. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur rerum minima nam voluptate nulla quod voluptas alias vitae soluta, ea harum itaque voluptatibus incidunt dicta odit! Blanditiis, maxime natus? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos illum fuga doloremque architecto quod animi at, sed, ipsum rem numquam tempora eveniet tempore, voluptatum maxime id voluptas corporis. Nihil, odit! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum est ipsa reprehenderit labore expedita consequatur beatae odit debitis vero eligendi ipsum atque, officia corporis at impedit veniam quo natus saepe! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis itaque maiores a vitae fugit incidunt reiciendis, voluptatum possimus commodi cupiditate. Impedit aperiam dolorum aut voluptatem odio rem nam cumque pariatur? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet et ratione delectus. Placeat magni labore quas voluptatum nesciunt consequuntur magnam dolor fugit, molestiae reprehenderit, quasi alias? Ullam consequuntur vero architecto? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius minus esse provident enim facilis expedita consequatur corrupti accusamus, rem nisi sapiente id ducimus veritatis harum, tempora nostrum repellendus error quas! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, quos nihil totam ex corrupti reprehenderit aperiam doloremque unde illo rerum, perferendis commodi ad veniam eum, fugit dolores minus ipsam cupiditate. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est eum quasi numquam similique, non commodi explicabo voluptates nobis cupiditate quaerat consequatur rerum, provident obcaecati! Nihil soluta saepe magni commodi repellendus. </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>
    )
  }
  