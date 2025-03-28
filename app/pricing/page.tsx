import Pricing from '@/components/pricing';
import {
  getProducts,
  getSubscription,
  getUser,
} from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function PricingPage() {
  try {
    const supabase = await createClient(); // createClient'ı await ile çağırın

    if (!supabase) {
      console.error("Supabase client oluşturulamadı.");
      return <div>Supabase client oluşturulamadı.</div>; // Hata durumunda kullanıcıya bilgi verin
    }

    const [user, products, subscription] = await Promise.all([
      getUser(supabase), // getUser fonksiyonu zaten async, doğru çağırılıyor.
      getProducts(supabase), // getProducts fonksiyonu zaten async, doğru çağırılıyor.
      getSubscription(supabase), // getSubscription fonksiyonu zaten async, doğru çağırılıyor.
    ]);

    return <Pricing user={user} products={products} subscription={subscription} />;
  } catch (error) {
    console.error("PricingPage fonksiyonunda hata:", error);
    return <div>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>; // Genel hata mesajı
  }
}