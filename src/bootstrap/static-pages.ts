/**
 * Static pages of the public site (sspf-public): home, about, activities,
 * contact and executive committee.
 *
 * On every boot this grants the Public role read access to the five single
 * types, and seeds any page that has no document yet with the content the
 * Angular app used to hard-code. Existing content is never overwritten, so
 * editors own it after the first boot.
 */

import type { Core, UID } from "@strapi/strapi";
import { mkdtemp, rm, stat, writeFile } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

type SeedImage = { url: string; name: string; alt: string };

type PageSeed = {
    uid: UID.ContentType;
    data: Record<string, unknown>;
    images?: Record<string, SeedImage>;
};

const IMAGE_TIMEOUT_MS = 10_000;

const unsplash = (id: string) =>
    `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

const SEEDS: PageSeed[] = [
    {
        uid: "api::home-page.home-page",
        data: {
            missionLabel: "พันธกิจ",
            missionText: "สนับสนุนกรมวิทยาศาสตร์บริการ",
            headline: "สร้างคุณภาพ เสริมมาตรฐานห้องปฏิบัติการทดสอบ สอบเทียบ",
            introMD:
                "หนึ่งในหัวใจสำคัญของการดำเนินงานของมูลนิธิ คือการ ส่งเสริมให้ห้องปฏิบัติการทดสอบ สอบเทียบ ในประเทศไทย พัฒนาและรักษามาตรฐาน ทั้งในด้านบุคลากร เครื่องมือ และกระบวนการวิเคราะห์ทดสอบ เพื่อยกระดับความเชื่อมั่นของผลการวิเคราะห์ และสนับสนุนการค้าการลงทุนทั้งในและต่างประเทศ",
            ctaLabel: "หลักสูตรฝึกอบรมสำหรับบุคคลทั่วไป",
            ctaLink: "/training",
            bannerQuote:
                "ห้องปฏิบัติการที่มีคุณภาพ คือรากฐานของความเชื่อมั่นในสินค้าและบริการไทย ซึ่งจำเป็นต้องได้รับการส่งเสริมและพัฒนาให้มีคุณภาพและมาตรฐานอย่างต่อเนื่อง เพื่อให้เป็นรากฐานที่สำคัญต่อระบบวิทยาศาสตร์และเทคโนโลยีของประเทศไทย ในการเป็นพลังขับเคลื่อนเศรษฐกิจนวัตกรรมสู่เวทีโลก",
            bannerAuthor: "มูลนิธิส่งเสริมวิทยาศาสตร์บริการ",
            bannerAuthorTagline: "คู่คิดของภาครัฐ พันธมิตรของภาคเอกชน",
        },
        images: {
            heroImage: {
                url: unsplash("1614308459036-779d0dfe51ff"),
                name: "home-hero.jpg",
                alt: "เครื่องมือวิทยาศาสตร์ที่ทันสมัย",
            },
            bannerImage: {
                url: unsplash("1581091013158-5c7184f43b62"),
                name: "home-banner.jpg",
                alt: "",
            },
        },
    },
    {
        uid: "api::about-page.about-page",
        data: {
            title: "ขับเคลื่อนวิทยาศาสตร์เพื่อประโยชน์ของสังคม",
            bodyMD:
                "มูลนิธิส่งเสริมวิทยาศาสตร์บริการก่อตั้งขึ้นด้วยเจตนารมณ์อันแน่วแน่ในการ ส่งเสริม สนับสนุน และต่อยอดพันธกิจด้านวิทยาศาสตร์ ที่กรมวิทยาศาสตร์บริการมีบทบาทหลัก โดยมูลนิธิทำหน้าที่เป็น “กลไกเสริม” ที่ยืดหยุ่น คล่องตัว และสามารถดำเนินงานบางด้านที่หน่วยงานของรัฐอาจไม่สามารถทำได้อย่างเต็มที่ เพื่อให้การบริการสาธารณะทางวิทยาศาสตร์เข้าถึงประชาชนและภาคเอกชนได้อย่างมีประสิทธิภาพและทั่วถึง",
            timeline: [
                {
                    date: "พฤษภาคม 2565",
                    title: "จัดตั้งมูลนิธิ",
                    description: "จดทะเบียนจัดตั้งมูลนิธิอย่างเป็นทางการ",
                },
                {
                    date: "มกราคม 2566",
                    title: "เวทีสาธารณะ",
                    description:
                        "จัดเวทีสาธารณะครั้งแรกเพื่อให้ความรู้เกี่ยวกับมาตรฐานผลิตภัณฑ์บรรจุอาหาร ที่กำลังเปลี่ยนมแปลงไป Sustainable Packaging",
                },
                {
                    date: "มีนาคม 2566",
                    title: "ที่ปรึกษา",
                    description:
                        "เริ่มรับให้คำปรึกษากับบริษัทเอกชนเพื่อการยกระดับความสามารถห้องปฏิบัติการเข้าสู่ระบบ ISO/IEC 17025",
                },
                {
                    date: "มิถุนายน 2568",
                    title: "วิจัยและพัฒนา",
                    description:
                        "เริ่มดำเนินการกิจกรรมการวิจัยทางวิทยาศาสตร์และเทคโนโลยีด้วยทุนสนับสนุนจากหน่วยงานภาครัฐ",
                },
            ],
            ctaTitle: "คู่คิดของภาครัฐ พันธมิตรของภาคเอกชน",
            ctaBodyMD:
                "มูลนิธิส่งเสริมวิทยาศาสตร์บริการ ไม่เพียงเป็นองค์กรไม่แสวงหากำไรที่ทำเพื่อสาธารณะเท่านั้น แต่ยังทำหน้าที่เป็น ตัวกลางระหว่างภาครัฐและเอกชน เพื่อพัฒนาและส่งเสริมวิทยาศาสตร์ในภาคอุตสาหกรรมและสังคมไทยให้เติบโตอย่างมีมาตรฐาน",
        },
        images: {
            image: {
                url: unsplash("1646956140268-a990c8e153ed"),
                name: "about.jpg",
                alt: "",
            },
        },
    },
    {
        uid: "api::activities-page.activities-page",
        data: {
            eyebrow: "จากห้องอบรมสู่เวทีสาธารณะ",
            title: "ร่วมสร้างสังคม\nวิทยาศาสตร์ที่เข้มแข็ง",
            intro: "มูลนิธิฯ ยังคงมุ่งมั่นในพันธกิจเพื่อสาธารณะ พร้อมเปิดรับความร่วมมือกับหน่วยงานและบุคคลที่มีจุดมุ่งหมายเดียวกัน หากคุณเชื่อในพลังของวิทยาศาสตร์เพื่อสร้างสังคมที่ตระหนักถึงระบบคุณภาพและมาตรฐาน เราขอเชิญร่วมเดินทางไปด้วยกัน",
            items: [
                {
                    icon: "cloud_arrow_up",
                    title: "ฝึกอบรม",
                    descriptionMD:
                        "บริการจัดอบรมทั้งในรูปแบบระยะสั้นและระยะยาว เพื่อพัฒนาทักษะและความรู้เฉพาะทางให้กับบุคลากรในห้องปฏิบัติการ ทั้งในด้านเทคนิคการวิเคราะห์ทดสอบ การประกันคุณภาพผลการทดสอบ การสอบเทียบเครื่องมือ ตลอดจนความเข้าใจในระบบมาตรฐาน ISO/IEC 17025 และระบบคุณภาพอื่น ๆ โดยมุ่งหวังให้ผู้เข้าร่วมสามารถนำความรู้ไปประยุกต์ใช้ได้จริง และยกระดับมาตรฐานการทำงานในองค์กรของตนเองได้อย่างยั่งยืน",
                },
                {
                    icon: "lock_closed",
                    title: "ที่ปรึกษา",
                    descriptionMD:
                        "มีทีมผู้เชี่ยวชาญคอยให้คำปรึกษาและแนวทางพัฒนาสำหรับห้องปฏิบัติการที่ต้องการปรับปรุงระบบคุณภาพหรือเตรียมความพร้อมเข้าสู่การรับรองมาตรฐาน ทั้งด้านโครงสร้างองค์กร ระบบเอกสาร ขั้นตอนการปฏิบัติงาน ไปจนถึงการจำลองการตรวจประเมิน (pre-audit) เพื่อช่วยลดความเสี่ยงในการไม่ผ่านการรับรอง พร้อมแนะนำวิธีการแก้ไขปัญหาเฉพาะด้านให้เหมาะสมกับสภาพจริงของแต่ละห้องปฏิบัติการ",
                },
                {
                    icon: "arrow_path",
                    title: "วิจัยและพัฒนา",
                    descriptionMD:
                        "ส่งเสริมการดำเนินงานวิจัยและพัฒนาที่เกี่ยวข้องกับวิทยาศาสตร์ห้องปฏิบัติการ โดยเน้นการประยุกต์ใช้เทคโนโลยีใหม่ เครื่องมือวิเคราะห์สมัยใหม่ และการพัฒนาแนวทางการควบคุมคุณภาพ เพื่อยกระดับประสิทธิภาพของการทดสอบและสอบเทียบในประเทศไทย อีกทั้งยังมุ่งเชื่อมโยงงานวิจัยกับความต้องการของภาคอุตสาหกรรม เพื่อให้เกิดนวัตกรรมที่ใช้งานได้จริงและขับเคลื่อนเศรษฐกิจของประเทศในระยะยาว",
                },
            ],
        },
    },
    {
        uid: "api::contact-page.contact-page",
        data: {
            title: "ช่องทางการติดต่อ",
            intro: "หากต้องการข้อมูลเพิ่มเติมหรือสอบถามเกี่ยวกับกิจกรรมที่มูลนิธิสามารถร่วมดำเนินการได้",
            contacts: [
                {
                    title: "ผู้จัดการมูลนิธิ",
                    name: "เดช บัวคลี่",
                    email: "det@sspf.or.th",
                    phone: "091 379 7096",
                },
                {
                    title: "ผู้ประสานงานอบรม",
                    name: "พัชรี แก้วนพรัตน์",
                    email: "patcharee@sspf.or.th",
                    phone: "02 201 7497",
                },
            ],
            addressTitle: "ที่อยู่มูลนิธิ",
            taxId: "099-3-00047234-9",
            officeName: "สำนักงานใหญ่",
            address: "75/7 ถนนพระรามที่ 6\nราชเทวี กรุงเทพมหานคร 10210",
        },
    },
    {
        uid: "api::executive-committee.executive-committee",
        data: {
            title: "คณะกรรมการชุดปัจจุบัน",
            appointedDate: "2024-12-06",
            members: [
                ["ดร. ปฐม สวรรค์ปัญญาเลิศ", "ประธานกรรมการ"],
                ["นางอุมาพร สุขม่วง", "รองประธานกรรมการ คนที่หนึ่ง"],
                ["นางสุมาลี ทั่งพิทยกุล", "รองประธานกรรมการ คนที่สอง"],
                ["นางดุษฎี มั่นความดี", "กรรมการ"],
                ["นางเทพีวรรณ จิตรวัชรโกมล", "กรรมการ"],
                ["นางสาวลดา พันธ์สุขุมธนา", "กรรมการ"],
                ["นายกนิษฐ์ ตะปะสา", "กรรมการ"],
                ["นางสาวปัทมา นพรัตน์", "กรรมการ"],
                ["นางสาวนีระนารถ แจ้งทอง", "กรรมการ"],
                ["นางพจมาน ท่าจีน", "กรรมการ"],
                ["นางอังสนา ฉั่วสุวรรณ์", "กรรมการ"],
                ["นางสาวอังค์วรา พูลเกษม", "กรรมการ"],
                ["นางรุ่งนภา มณีนิล", "กรรมการและเหรัญญิก"],
                ["นายเดช บัวคลี่", "กรรมการและเลขานุการ"],
            ].map(([name, position]) => ({ name, position })),
        },
    },
];

async function grantPublicRead(strapi: Core.Strapi) {
    const publicRole = await strapi.db
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });
    if (!publicRole) return;

    for (const { uid } of SEEDS) {
        const action = `${uid}.find`;
        const existing = await strapi.db
            .query("plugin::users-permissions.permission")
            .findOne({ where: { action, role: publicRole.id } });
        if (!existing) {
            await strapi.db
                .query("plugin::users-permissions.permission")
                .create({ data: { action, role: publicRole.id } });
        }
    }
}

// Downloads an image into the media library; returns its id, or undefined if
// the download fails so the page is still seeded without it.
async function uploadImage(strapi: Core.Strapi, image: SeedImage) {
    const dir = await mkdtemp(join(tmpdir(), "sspf-seed-"));
    try {
        const res = await fetch(image.url, {
            signal: AbortSignal.timeout(IMAGE_TIMEOUT_MS),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const filepath = join(dir, image.name);
        await writeFile(filepath, Buffer.from(await res.arrayBuffer()));
        const [file] = await strapi
            .plugin("upload")
            .service("upload")
            .upload({
                data: { fileInfo: { name: image.name, alternativeText: image.alt } },
                files: {
                    filepath,
                    originalFilename: image.name,
                    mimetype: res.headers.get("content-type") ?? "image/jpeg",
                    size: (await stat(filepath)).size,
                },
            });
        return file.id as number;
    } catch (err) {
        strapi.log.warn(
            `[static-pages] could not seed image ${image.name}: ${err.message}`
        );
        return undefined;
    } finally {
        await rm(dir, { recursive: true, force: true });
    }
}

async function seedMissingPages(strapi: Core.Strapi) {
    for (const { uid, data, images } of SEEDS) {
        const existing = await strapi.documents(uid).findFirst();
        if (existing) continue;

        const media: Record<string, number> = {};
        for (const [field, image] of Object.entries(images ?? {})) {
            const id = await uploadImage(strapi, image);
            if (id) media[field] = id;
        }

        await strapi
            .documents(uid)
            .create({ data: { ...data, ...media } as any, status: "published" });
        strapi.log.info(`[static-pages] seeded ${uid}`);
    }
}

export async function bootstrapStaticPages(strapi: Core.Strapi) {
    await grantPublicRead(strapi);
    await seedMissingPages(strapi);
}
