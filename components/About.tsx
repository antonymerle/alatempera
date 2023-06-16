import React from "react";
import Image from "next/image";
import style from "../styles/About.module.css";

const { aboutContainer, imgContainer, aboutImage, textContainer } = style;

const About = () => {
  return (
    <div className={aboutContainer}>
      <div className={imgContainer}>
        <Image
          className={aboutImage}
          src={"/art.jpg"}
          width={936}
          height={1436}
          // layout="fill"
          // objectFit="cover"
          // objectPosition="center"
          alt="art"
        />
      </div>
      <div className={textContainer}>
        <h2>A propos</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          suscipit beatae nihil sunt asperiores nostrum qui voluptatem voluptas
          deleniti fugiat? Dicta eum maiores iure velit voluptatum eaque
          voluptas temporibus nemo in! Excepturi eaque nobis incidunt in nisi,
          iste laboriosam? Eaque, architecto itaque. Laborum, placeat eligendi
          excepturi laudantium deserunt officia id in. Tempora qui dicta,
          quaerat commodi mollitia optio voluptatem quidem temporibus tempore.
          Excepturi voluptate praesentium rerum! Illo eaque tenetur, dignissimos
          rem numquam officiis perspiciatis, est eum commodi molestias similique
          vero. Cupiditate cum consequatur doloribus labore a voluptates est
          quis dolorum sit, quibusdam enim, voluptas assumenda, pariatur
          temporibus veritatis debitis ratione tenetur repellendus ex?
          Laudantium labore adipisci ab, perferendis culpa earum placeat iure
          ratione, odit fugit eius. Harum facilis fugiat, ea delectus eligendi
          deserunt ab! Minima quis dicta, necessitatibus saepe, totam, hic ut
          atque unde porro laudantium dignissimos! Unde nobis mollitia ea. Culpa
          similique, totam iste perspiciatis dolorum voluptates numquam a
          doloremque, odio dolor adipisci nesciunt exercitationem at accusamus
          aspernatur labore inventore. Adipisci magnam voluptatem aliquid minus
          officiis minima quae quam asperiores nihil laboriosam? Dignissimos,
          facere hic harum nobis quisquam culpa numquam, inventore libero nemo
          deleniti quae. Eos doloremque laborum voluptatem unde magni fugit iure
          commodi autem ratione minima modi dolorum maxime saepe placeat sequi
          odio nesciunt, ab ea laudantium consectetur, atque ex reprehenderit
          veritatis distinctio. Eos, ab odio perferendis maxime, qui harum ipsum
          ipsa, similique sapiente suscipit quis sed quo sint nostrum nulla
          omnis deleniti corporis laboriosam iure nisi optio pariatur quas modi!
          Beatae, ullam, voluptatum mollitia, voluptatem sequi totam
          exercitationem reprehenderit ipsum rerum dolore perferendis?
          Reprehenderit dolorem ea hic cum, ipsum molestias ad dolores maiores
          sapiente corrupti laboriosam, dolorum voluptas iusto explicabo quaerat
          totam earum voluptate dignissimos accusamus possimus id magni
          suscipit! Amet laboriosam nisi saepe optio deleniti voluptas ab
          commodi obcaecati? Modi sunt deleniti necessitatibus perferendis
          dolore dignissimos voluptatibus enim maiores, repudiandae architecto
          tenetur alias ipsum nulla totam fuga animi facilis! Vero omnis
          excepturi magni. Voluptatum nulla error alias perferendis aliquam
          adipisci, nam mollitia deleniti quae, necessitatibus eligendi
          molestias. Facilis soluta repellat dolorum labore eaque molestiae
          placeat fugiat perferendis aut dignissimos saepe, nobis, cum veritatis
          fugit consequuntur vero quam nihil temporibus tempore rerum. Natus hic
          iusto neque repellendus nulla alias! Fugit reprehenderit hic laborum
          blanditiis rerum quod ut veritatis vitae ab error. Animi debitis
          tenetur quasi, ipsam porro suscipit repudiandae fugiat dolore, vel
          saepe accusantium. Maiores nobis obcaecati animi sit esse excepturi
          iusto, eaque sed quisquam expedita modi!
        </p>
      </div>
    </div>
  );
};

export default About;
