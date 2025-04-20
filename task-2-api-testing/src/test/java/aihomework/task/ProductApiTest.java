package aihomework.task;

import static org.junit.jupiter.api.Assertions.*;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

public class ProductApiTest {

  @Test
  public void testProductDataForDefects() {
    String baseUrl = "https://fakestoreapi.com/products";

    Response response = RestAssured.get(baseUrl);
    assertEquals(200, response.statusCode(), "Expected HTTP status code 200");

    List<Map<String, Object>> products = response.jsonPath().getList("$");

    List<Map<String, Object>> defectiveProducts = new ArrayList<>();

    for (Map<String, Object> product : products) {
      boolean isDefective = false;
      String title = (String) product.get("title");
      Double price = ((Number) product.get("price")).doubleValue();

      Map<String, Object> rating = (Map<String, Object>) product.get("rating");
      Double rate = rating != null ? ((Number) rating.get("rate")).doubleValue() : null;

      if (title == null || title.trim().isEmpty()) {
        isDefective = true;
      }
      if (price < 0) {
        isDefective = true;
      }
      if (rate != null && rate > 5) {
        isDefective = true;
      }

      if (isDefective) {
        defectiveProducts.add(product);
      }
    }

    System.out.println("🚨 Defective Products Found: " + defectiveProducts.size());
    for (Map<String, Object> defectiveProduct : defectiveProducts) {
      System.out.println(defectiveProduct);
    }

    // Optional assertion: fail if any defective products are found
    assertTrue(defectiveProducts.isEmpty(), "Some products have defects.");
  }
}
