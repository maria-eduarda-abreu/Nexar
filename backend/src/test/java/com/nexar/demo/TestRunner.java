package com.nexar.demo;

import io.cucumber.junit.Cucumber;
import io.cucumber.junit.CucumberOptions;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@CucumberOptions(
        features = "src/test/resources/features",
        glue = "com.nexar.demo",
        plugin = {
                "pretty",
                "html:build/cucumber-report.html"
        }
)
public class TestRunner {
}